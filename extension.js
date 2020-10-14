const vscode = require('vscode')
const updateHtmlByLess = require('./updateHtmlByLess')

let self = {
  enableFileMap: {},
  statusBarItem: null,
  getText() {
    return vscode.window.activeTextEditor.document.getText()
  },
  getLessCode() {
    var text = this.getText()
    var lessCode = text.match(/<style.*?>([^]*?)<\/style>|$/)[1] || ''
    return lessCode
  },
  getHtmlCode() {
    var text = this.getText()
    var lessCode = text.match(/<template.*?>([^]*?\n)<\/template>|$/)[1] || ''
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

    if (text.indexOf('<template>') == -1) {
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
  setStatusBarItem() {
    this.statusBarItem = this.statusBarItem || vscode.window.createStatusBarItem()
    this.statusBarItem.command = 'autoHtml:toggle'
    this.statusBarItem.show()

    // text
    if (vscode.window.activeTextEditor) {
      var fileName = vscode.window.activeTextEditor.document.fileName
      this.statusBarItem.text = `autoHtml${this.enableFileMap[fileName] ? '💚' : '💔'}`
      console.log(this.statusBarItem.text, fileName)
    } else {
      this.statusBarItem.text = ''
    }
  },
  registerCommand() {
    vscode.commands.registerCommand('autoHtml:enable', async () => {
      var fileName = vscode.window.activeTextEditor.document.fileName
      this.enableFileMap[fileName] = true
      this.setStatusBarItem()

      console.log('autoHtml:endable', fileName) // 无法打印？
    })
    vscode.commands.registerCommand('autoHtml:disable', () => {
      var fileName = vscode.window.activeTextEditor.document.fileName
      delete this.enableFileMap[fileName]
      this.setStatusBarItem()
    })
    vscode.commands.registerCommand('autoHtml:toggle', () => {
      var fileName = vscode.window.activeTextEditor.document.fileName
      if (this.enableFileMap[fileName]) {
        delete this.enableFileMap[fileName]
      } else {
        this.enableFileMap[fileName] = true
      }
      this.setStatusBarItem()
    })
  },
  onSave() {
    vscode.workspace.onWillSaveTextDocument((e) => {
      var fileName = vscode.window.activeTextEditor.document.fileName
      console.log(fileName)
      var enable = this.enableFileMap[fileName]
      if (!enable) return
      this.updateHtml()
    })
  },
  activate(context) {
    this.registerCommand()

    this.setStatusBarItem()
    vscode.window.onDidChangeActiveTextEditor(e => {
      this.setStatusBarItem()
    })
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
