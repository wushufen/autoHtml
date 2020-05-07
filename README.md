# autoHtml README

这是一个本人开发的一个 `vscode` 插件，它可以根据你写的 `css` 实时帮你书写对应的 `html`  
这不是简单的替换，而是根据 `css + dom diff` 算法，来计算出缺少的 `html` 节点，自动帮你写 `html` ，不影响已存在的代码。可解放绝大部分的 `html` 书写，大大节省你的时间。

暂未发布到 `store`

## 演示
![autoHtml.gif](https://wusfen.github.io/autoHtml/autoHtml.gif)  

后代选择器 `.parent .grandchild` 和 子选择器 `.parent > .child` 都会先生成子节点，后代选择器生成的节点可自行改变层级，不会重复生成。

## 计划

**输入样式**
 `css`, `less`, `scss`, `sass`, `stylus`
 
 **输出代码**
 `html`, `vue`, `react`
