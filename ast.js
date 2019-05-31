var reg = function (string, flags) {
  string = string.source || string
  for (var k in reg) {
    if (!reg.hasOwnProperty(k)) continue
    var n = RegExp('{' + k.replace(/[.(){}[\]\\^$]/g, '\\$&') + '}', 'g')
    var v = '(?:' + reg[k].source + ')'
    string = string.replace(n, v)
  }
  return RegExp(string, flags)
}

reg[' '] = /[ \t]+/
reg['  '] = /\s+/
reg['..'] = /[\s\S]/
reg.comment = /\/\/.*|\/\*[\s\S]*?\*\//
reg.string = /"(?:\\.|.)*?"|'(?:\\.|.)*?'|`(?:\\.|.)*?`/
reg.num = /[0-9]+/
reg.char = /[a-zA-Z]|[^\x00-\xff]/
reg.pun = /[`~!@#$%^&*()_\-=+[{\]}\\|;:'",<.>/?]/
reg.uint = /(?:0[xXoO])?[0-9]+/
reg.int = reg('[-+]?{uint}')
reg.ufloat = reg('{uint}\\.{uint}?|\\.{uint}')
reg.float = reg('[-+]?{ufloat}')
reg.number = reg('(?:{float}|{int})e{int}|{float}|{int}')
reg.op = reg(/[+\-*/%]/)
reg['(..)'] = reg('\\({..}*?\\)')
reg['(..)'] = reg('\\((?:{(..)}|{..})*?\\)')
reg['(..)'] = reg('\\((?:{(..)}|{..})*?\\)')
reg.function = reg('{var}{ }?{(..)}')

// css
reg.char = reg('{char}|[-_]')
reg.chars = reg('{char}+')
reg.var = reg('{chars}(?:{uint}|{chars})*')
reg.var = reg('[@$]?{var}|{var}?#?\\{\\S*?\\}{var}?') // @x  $x  {var}  #{var}  x
reg.number = reg('{number}{var}?') // 1px
reg.value = reg('{string}|{function}|{var}|{number}|{(...)}') // ""  fun()  x  1  (1+1)
reg.exp = reg('{value}(?:{ }?{op}{ }?{value})*') // value+value
reg.values = reg('{exp}(?:{ }?[ ,]{ }?{exp})*') // a b c  a, b, c

reg.tag = reg('{var}|\\*|&') // div * &
reg.id = reg('#{var}') // #id
reg.class = reg('\\.{var}') // .class
reg.attr = reg('\\[{ }?{var}(?:.?=(?:{string}|{var}))?{ }?\\]') // [attr] [attr=s]
reg.pseudo = reg('::?{var}(?:\\(.*?\\))?') // ::after :nth-child(n)
reg.combinator = reg('[ +~>]') // ' ' + ~ >
reg.simpleSelector = reg('{tag}?(?:{tag}|{class}|{id}|{attr}|{pseudo})') // div.clas
reg.selector = reg('{simpleSelector}(?:{ }?{combinator}{ }?{simpleSelector})*') // div.class > child
reg.selectors = reg('{selector}(?:{  }?,{  }?{selector})*') // .class, .class2
reg.declaration = reg('{var}{ }?[ :]{ }?{values}{ }?;?') // width 1px

// console.log(reg)


var code = `
{div} #id >.class+ [attr] ~ :first-child{
  a 1
  b 2 3
  b 4, 5, 6
  .list{
    .item,
    .child{

    }
  }
}
`
var code = `
-pos(type, args)
  i = 0
  position: unquote(type)
  {args[i]}: args[i + 1] is a 'unit' ? args[i += 1] : 0
  {args[i += 1]}: args[i + 1] is a 'unit' ? args[i += 1] : 0

absolute()
  -pos('absolute', arguments)

fixed()
  -pos('fixed', arguments)

#prompt
  absolute: top 150px left 5px
  width: 200px
  margin-left: -(@width / 2)

#logo
  fixed: top left
`
reg.tokens = reg('{   }|{comment}|{declaration}|{function}|{selectors}|{string}|{var}|{number}|{pun}|{chars}', 'g')
reg.tokens = reg('{comment}|{function}|{declaration}|{selectors}')
reg.tokens = reg(reg['tokens'], 'g')
var tokens = code.match(reg.tokens)

console.log(tokens)

