const less = require('less')
const jsdom = require('jsdom')

const window = new jsdom.JSDOM().window
const document = window.document


/*
{
  selectors: [
    {
      elements: [
        {
          combinator:{
            value
          }
          value
        }
      ]
    }
  ],
  rules: [
    Declaration,
    Rule,
  ],
}
 */
function getTagNameAndFirstClassName(selector) {
  var elements = selector.elements
  var element = elements[0]
  var tagName = ''
  var className = element.value // .class
  var combinatorValue = element.combinator.value // 连接符 [ >~+]

  if (combinatorValue.match(/^$| |>/)) { // 子或后代选择器
    // 第一个为标签选择器
    if (className.match(/^[a-z]/i)) {
      tagName = className
      className = ''
      var element1 = elements[1]
      if (element1 && element1.combinator.value === '') { // tag.class
        className = element1.value
      }
    }

    return {
      combinatorValue,
      isChild: combinatorValue === '>', // 直接子节点
      tagName,
      className,
    }
  }
}

function findChildNode(node, { tagName, className }) {
  tagName = tagName || ''
  className = className || ''
  if (className) {
    className = className.replace(/^\.?/, '.')
  }
  var childNode = node.querySelector(tagName + className) // 允许隔代
  return childNode
}

function createElement({ tagName, className }) {
  var el = document.createElement(tagName || 'div')
  if (className) {
    el.className = className.replace(/^\./, '')
  }
  return el
}

function insertChildNode(node, childNode, nextChildNode) {
  nextChildNode = nextChildNode

  if (nextChildNode) {
    node.insertBefore(childNode, nextChildNode)
    // 换行
    if (node.firstChild && node.firstChild.nodeType === 3) {
      var ln = node.firstChild.cloneNode()
      node.insertBefore(ln, nextChildNode)
    }
  } else {
    if (node.innerHTML.match(/^\s*$/)) {
      node.innerHTML = ''
      var indent = '\n'
      var parentNodeFirstChild = node.parentNode.firstChild
      if (parentNodeFirstChild && parentNodeFirstChild.nodeType === 3) {
        indent = parentNodeFirstChild.nodeValue
      }
      ln = document.createTextNode(indent + '  ')
      node.appendChild(ln)

      node.appendChild(childNode)

      ln = document.createTextNode(indent)
      node.appendChild(ln)
    } else {
      if (node.lastChild && node.lastChild.nodeType === 3) {
        node.insertBefore(childNode, node.lastChild)
        // 换行
        if (node.firstChild && node.firstChild.nodeType === 3) {
          var ln = node.firstChild.cloneNode()
          node.insertBefore(ln, childNode)
        }
      } else {
        node.appendChild(childNode)
      }
    }
  }
}

async function createHtmlByLess(lessCode, htmlCode) {
  var rule = await less.parse(lessCode)
  var node = ((document.body.innerHTML = htmlCode), document.body)
  // console.log(rule, node)

  function loopTree(rule, node) {
    rule.rules.filter(item => item.selectors).forEach((childRule, ruleIndex, rules) => {
      var childRuleSelectors = childRule.selectors

      // 根据选择器添加节点
      childRuleSelectors.forEach(childSelector => {
        var tagNameAndFirstClassName = getTagNameAndFirstClassName(childSelector)

        if (tagNameAndFirstClassName) {
          var { tagName, className, isChild } = tagNameAndFirstClassName
          var childNode = findChildNode(node, { tagName, className })  // 允许隔代存在 parent div ... child

          // 如果还没有该节点
          if (!childNode || (isChild && childNode.parentNode !== node)) {
            // 新建节点
            childNode = createElement({ tagName, className })

            // 下一个选择器的元素是否已存在了，存在则放于之前
            var nextChildNode
            var nextChildRule = rules[ruleIndex + 1]
            if (nextChildRule) {
              var nextChildRuleSelector = nextChildRule.selectors[0]
              var ntc = getTagNameAndFirstClassName(nextChildRuleSelector)
              if (ntc) {
                var { tagName, className } = ntc
                nextChildNode = findChildNode(node, { tagName, className })
              }
            }

            insertChildNode(node, childNode, nextChildNode)

            // console.log('appendChild', tagName, className)
          }

          // 递归
          loopTree(childRule, childNode)
        }
      })
    })
  }
  loopTree(rule, node)

  return (node.innerHTML)
}

module.exports = createHtmlByLess
