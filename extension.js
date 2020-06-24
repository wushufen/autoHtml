const vscode = require('vscode')
const jsdom = require('jsdom')
const updateHtmlByLess = require('./updateHtmlByLess')

let self = {
  getText() {
    return vscode.window.activeTextEditor.document.getText()
  },
  getLessCode() {
    var text = this.getText()
    var lessCode = (text.match(/<style.*?>([\s\S]*?)<\/style>/) || [])[1] || ''
    return lessCode
  },
  getHtmlCode() {
    var text = this.getText()
    var lessCode = (text.match(/<template.*?>([\s\S]*?\n)<\/template>/) || [])[1] || ''
    return lessCode
  },
  getPositionByIndex(index) {
    var line = 0
    var col = 0
    var i = 0
    var text = this.getText()
    while (i < index) {
      var c = text[i]
      if (c == '\n') {
        col = 0
        line += 1
      } else {
        col += 1
      }
      i += 1
    }
    return new vscode.Position(line, col)
  },
  findTemplate() {
    var text = this.getText()
    var startIndex = text.indexOf('<template>') + 10
    var endIndex = text.lastIndexOf('</template>')
    var startPosition = this.getPositionByIndex(startIndex)
    var endPosition = this.getPositionByIndex(endIndex)
    var range = new vscode.Range(startPosition, endPosition)
    var tpl = text.substring(startIndex, endIndex)

    if (text.indexOf('<template>')==-1) {
      return
    }
    
    return {
      tpl: tpl,
      range: range,
    }
  },
  async updateHtml() {
    var lessCode = this.getLessCode()
    var template = this.findTemplate()

    if (!template) {
      return
    }

    var html = await updateHtmlByLess(lessCode, template.tpl)

    if (html != template.tpl) {
      console.log('updateHtml', `|${template.tpl.length}|`, `|${html.length}|`)
      vscode.window.activeTextEditor.edit(editBuilder => {
        editBuilder.replace(template.range, html)
      })
    }

    return html
  },
  registerCommand() {
    vscode.commands.registerCommand('autoHtml', async () => {
      this.updateHtml()
    })
  },
  onSave() {
    vscode.workspace.onWillSaveTextDocument((e) => {
      this.updateHtml()
    })
  },
  activate(context) {
    this.registerCommand()
    this.onSave()
  },
  deactivate() {
    console.log('deactivate')
  },
}



module.exports = {
  activate: self.activate.bind(self),
  deactivate: self.deactivate.bind(self),
}
