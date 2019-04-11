/*把code写到#code和style标签里*/
function writeCss(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 70)
}
function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var css1 = `/* 
 * 大家好，我们是代码全队
 * 只用文字来介绍显得有点单调
 * 我就用代码来介绍吧
 * 先写一些样式美化一下，请稍等片刻
 */

*{
  transition: all .8s;
}

/* 字体好像有点小，放大一点 */
body {
  font-size: 1.3rem;
}

html{
  background: #eee;
}
#code{
  border: 1px solid #aaa;
  padding: 16px;
}

/* 我需要一点代码高亮 */

.token.selector{ color: #690; }
.token.property{ color: #905; }

/* 加一个呼吸效果 */

#code{
  animation: breath 0.5s infinite alternate-reverse;
}

/* 现在正式开始吧！ */

/* 我们先弄一张白纸 */

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
  display: block;
}

/* 请看右边~ */
`

var css2 = `
/* 接下来我们用一个优秀的库 marked.js
 * 把 Markdown语法 转成 HTML
 * 让我们的界面更简洁美观一点
 */



`
var md = `
## 代码全队
### 队员
- 李楠
- 郑嘉琪
- 卢冠雄
- 倪浩敏
- 曾宝浩

## 网页介绍
- 响应式页面
- 添加了动画过渡等效果提高用户体验
- 进行了代码压缩，提高了网页加载速度


`
let css3 = `
/*
 * 谢谢观看~
 */
`

writeCss('', css1, () => { // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, () => {
      writeCss(css1, css2, () => {
        convertMarkdownToHtml(() => {
          writeCss(css1 + css2, css3, () => {
            console.log('完成')
          })
        })
      })
    })
  })
})




function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}

