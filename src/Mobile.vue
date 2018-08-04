<template>
    <div id="app">
        <StyleEditor ref="styleEditor" :code="currentStyle"></StyleEditor>
        <ResumeEditor ref="resumeEditor" :enableHtml="enableHtml" :markdown="currentMarkdown"></ResumeEditor>
    </div>
</template>

<script>
    import StyleEditor from './components/styleEditor.vue'
    import ResumeEditor from './components/resumeEditor.vue'

    export default {
        name: 'app',
        components: {
            StyleEditor,
            ResumeEditor
        },
        data() {
            return {
                interval: 40,
                enableHtml:false,
                currentStyle: '',
                fullStyle: [
                    `
/* 你好，我是郑天宇，这是我制作的一个Vue简历*/
/* 现在有点难看，我们加点CSS吧*/
/* 首先给所有元素加上过度效果*/
*{ transition: all .3s;}
/* 背景太单调了，来个背景色*/
html {
    color: rgb(222,222,222);
    background: rgb(0,43,54);
}
/*文字好像有点太靠边了*/
.styleEditor{
    padding: .5em;
    border: 1px solid #ddd;
    overflow: auto;
    width:60vh;height:45vh
}
/*代码高亮一下*/
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }
/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
  }
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}
/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed;
  top: 50%; left: 0;
  padding: .5em;  margin: 2.5vh;
  width: 95vw; height: 45vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */
              `,
                    `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`,
                    `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}`],
                currentMarkdown: ``,
                fullMarkdowm:
                    `
郑天宇
----
前端工程师，现在在 山东正元地球物理信息技术有限公司工作。
技能
----
* HTML/CSS
* JavaScript, jQuery , Vue
* Bootstrap, ElementUI
----
* [GitHub](https://github.com/Storm4542)
> GitHub里有我的写的轮子，做的笔记等。

                `
            }
        },

        methods: {
            makeResume: async function () {
                await this.ShowStyle(0);
                await this.ShowResume();
                await this.ShowStyle(1);
                await this.showHtml();
                await this.ShowStyle(2);
            },
            showHtml(){
                return new Promise((resolve,reject)=>{
                    this.enableHtml = true;
                    resolve()
                })
            },
            ShowStyle(n) {
                return new Promise((resolve, reject) => {
                    let interval = this.interval;
                    let show = (async function () {
                        let style = this.fullStyle[n];
                        if (!style) {
                            return
                        }
                        let length = style.length;
                        let i = 0;
                        if(this.currentStyle.length > 0){
                            let oldStyle = this.currentStyle;
                            let timer = setInterval(() => {
                                this.currentStyle =oldStyle+ style.substring(0, i);

                                this.$nextTick(() => {
                                    this.$refs.styleEditor.goBottom()
                                })

                                if (i === length - 1) {
                                    window.clearInterval(timer);
                                    resolve()
                                } else {
                                    i += 1;
                                }

                            }, interval)
                        }else{
                            let timer = setInterval(() => {
                                this.currentStyle = style.substring(0, i);
                                if (i === length - 1) {
                                    window.clearInterval(timer);
                                    resolve()
                                } else {
                                    i += 1;
                                }

                            }, interval)
                        }

                    }).bind(this);

                    show()
                })
            },
            ShowResume() {
                return new Promise((resolve, reject) => {
                    let interval = this.interval;
                    let show = (async function () {
                        let length = this.fullMarkdowm.length;
                        let n = 0;
                        let timer = setInterval(() => {
                            this.currentMarkdown = this.fullMarkdowm.substring(0, n);
                            if (n === length - 1) {
                                window.clearInterval(timer);
                                resolve()
                            } else {
                                n += 1
                            }
                        }, interval)
                    }).bind(this);
                    show()
                })

            }
        },
        created() {
            this.makeResume();
        }
    }
</script>

<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        min-height: 100vh;
        position: relative;
    }
    html {
        min-height: 100vh;
    }
    *{
        box-sizing: border-box;
    }
</style>
