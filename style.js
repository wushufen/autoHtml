var reg = function (name, string, flags) {
  if (!string) {
    return reg[name]
  }
  string = string.source || string
  for (var k in reg) {
    if (!reg.hasOwnProperty(k)) continue
    var n = RegExp('{' + k.replace(/[.(){}[\]]/g, '\\$&') + '}', 'g')
    var s = reg[k].source
    var v = s.match(/\|/) ? '(?:' + s + ')' : s
    string = string.replace(n, v)
  }
  var r = RegExp(string, flags)
  if (name !== null) {
    reg[name] = r
  }
  return r
}

// css
reg('space', /\s+/)
reg('comment', /\/\/.*|\/\*[\s\S]*?\*\//)
reg('string', /"(?:\\.|.)*?"|'(?:\\.|.)*?'|`(?:\\.|.)*?`/)
reg('bound', /[\{\}]/)
reg('chars', /[^\s{},]+/)
reg('text', '(?:{string}|{chars})+')
reg('text', '{text}(?: +{text})*')

reg('tokens', '{comment}|{selector}|{text}|{bound}', 'g')
// reg('tokens', '{space}|{tokens}', 'g')

var code = `
div,
input{
  color "#0af{"
  width 1px
  bw: 1px 2px 3px
  bs: 1px 2px 3px , 4px 5px 6px;
  > ul{
    + li{
      w 1
      background: alwejflawjef(
        alweijflawef,
        awefijawoef,
        awef
      )
    }
  }
}
`

var tokensReg = reg('tokens')
var tokens = code.match(tokensReg)
console.log(tokensReg)
console.log(tokens)

var ast = {
  text: '',
  children: []
}
for (let i = 0; i < tokens.length; i++) {
  var token = tokens[i]
  // console.log(token)
}