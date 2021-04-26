<p align="center">
  <a href="https://www.cmappax.com/keyboard/vue2.x">
    <img width="500" src="https://www.cmappax.com/editorResource/keyboard/keyboard.svg" alt="Logo">
  </a>
</p>

<h3 align="center">
    Simple, Fast Key-Board.
</h3>

> ### keyBoard base on Vue2.x , support hand write.

<p align="center">  
  <img alt="gzip size" src="https://img.badgesize.io/https://raw.githubusercontent.com/cangshudada/vue-keyBoard/main/lib/keyboard.min.js?compression=gzip&style=flat-square">
  <img alt="No dependencies" src="https://img.shields.io/badge/dependencies-none-27ae60.svg?style=popout-square">
  <a href="https://github.com/cangshudada/vue-keyBoard/releases"><img alt="Github Current version"
  src="https://img.shields.io/github/v/release/cangshudada/vue-keyBoard.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/keyboard-virtual-vue"><img alt="Npm Current version"
  src="https://img.shields.io/npm/v/keyboard-virtual-vue.svg?style=flat-square"></a>
</p>

<br>

<h4 align="center">
  <a href="https://www.cmappax.com/keyboard/vue2.x">Fully Featured demo</a>
</h4>

> ### Other versions

- For Vue 3.0, Please to using [vue-keyboard-virtual-next](https://github.com/cangshudada/vue-keyBoard-next).

- For React, Please to using [virtual-keyboard-react](https://github.com/cangshudada/react-keyBoard).



**They have the same function as the Vue2.x version**



## Overview

<h3 align="center">
  <img width="250" alt="Demo" src="https://www.cmappax.com/editorResource/keyboard/overview1.jpg"/>
  <img width="250" alt="Demo" src="https://www.cmappax.com/editorResource/keyboard/overview2.jpg"/>
  <img width="250" alt="Demo" src="https://www.cmappax.com/editorResource/keyboard/overview3.jpg"/>
</h3>



## 关于

### 特性 🎉

- 支持多达五种键盘模式
- 支持自定义主题色
- 已集成丰富的中文字库
- 支持急速识别的手写能力
- vue 组件开箱即用



## 支持环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)Opera |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                              | last 2 versions                                                                                                                                                                                          | last 2 versions                                                                                                                                                                                          | last 2 versions                                                                                                                                                                                      |

## 安装

### 使用 npm 或 yarn 安装

```bash
$ npm install keyboard-virtual-vue --save
```

```bash
$ yarn add keyboard-virtual-vue --save
```

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm)。

## 使用

### 全局引入

```javascript
import Vue from "vue";
import App from "./app";
import "keyboard-virtual-vue/keyboard.min.css";
import KeyBoard from "keyboard-virtual-vue";

Vue.use(KeyBoard);

new Vue({
  el: "#app",
  template: "<App/>",
});
```

### 局部引入

```vue
<template>
  <!-- keyboard 只识别带有 data-mode 标识的输入框 -->
  <input data-mode v-model="value" />
  <Key-Board />
</template>

<script>
import "keyboard-virtual-vue/keyboard.min.css";
import KeyBoard from "keyboard-virtual-vue";
export default {
  data() {
    return {
      value: "你好"
    };
  },
  components: { KeyBoard },
};
</script>
```

### 配置参数



### Input标签属性
|     属性      | 说明                                                         | 类型   | 可选值                                      | 默认值         |
| :-----------: | :----------------------------------------------------------- | :----- | :------------------------------------------ | :------------- |
| **data-mode** | 弹出输入法的类型：<br>`en` 英文小写<br>`number`数字<br>`symbol` 标点<br>`handwrite` 手写<br/> `不传` 默认中文 | String | `en`<br>`number`<br>`symbol`<br>`handwrite` | `default as *` |
| **data-prop** | 注册的输入框的类型                                           | String | *                                           |                |



### Props属性

|       参数        |                             说明                             |         默认值          |      类型      | 是否必须 |  版本   |
| :---------------: | :----------------------------------------------------------: | :---------------------: | :------------: | :------: | :-----: |
|      v-model      | _绑定的输入框value_,可同时双向绑定多个输入框，不传则只与当前focus输入框做数据绑定关系 |                         | string\|number |    否    | v1.0.0+ |
|       color       |                           _主题色_                           |        `#eaa050`        |     string     |    否    | v1.0.0+ |
|     modeList      |      _键盘渲染模式列表_，若不传handApi则不会出现手写板       | ["handwrite", "symbol"] |    string[]    |    否    | v1.0.0+ |
|     blurHide      |               _是否当前输入框blur事件触发隐藏_               |          true           |    boolean     |    否    | v1.0.0+ |
|   showHandleBar   |                      _是否显示拖拽句柄_                      |          true           |    boolean     |    否    | v1.0.0+ |
|  dargHandleText   |                       拖拽句柄提示文字                       |                         |     string     |    否    | v1.0.0+ |
|       modal       |                       _是否显示遮罩层_                       |          false          |    boolean     |    否    | v1.0.0+ |
| closeOnClickModal |                    是否点击遮罩层隐藏键盘                    |          true           |    boolean     |    否    | v1.0.0+ |
|      handApi      |            手写识别接口，若不传则无法切换手写模块            |                         |     string     |    否    | v1.0.0+ |
|   animateClass    | 键盘显隐动画，内置slide动画，如若需要其他动画，可传入相应类名自定义动画 |                         |     string     |    否    | v1.0.0+ |



### Events

|    参数    |                             说明                             |                          类型                           |  版本   |
| :--------: | :----------------------------------------------------------: | :-----------------------------------------------------: | :-----: |
| keyChange  | 按键触发事件，第一个参数为当前触发的按键的标识,`第二个参数为当前聚焦输入框的props值，若没有则直接返回当前聚焦的input元素（v1.0.1版本之后）` | (*value*: string,prop:string\|HTMLInputElement) => void | v1.0.0+ |
|   change   | value改变事件，第一个参数为当前最新通过键盘输入的值，`第二个参数为当前聚焦输入框的props值，若没有则直接返回当前聚焦的input元素（v1.0.1版本之后）` | (*value*: string,prop:string\|HTMLInputElement) => void | v1.0.0+ |
|   closed   |                         键盘关闭事件                         |                       () => void                        | v1.0.0+ |
| modalClick |                         遮罩点击事件                         |                       () => void                        | v1.0.0+ |

#### 

## Component Event

| 方法名          | 说明                                                         | 类型                           | 版本    |
| --------------- | ------------------------------------------------------------ | ------------------------------ | ------- |
| signUpKeyboard  | 重新给input注册绑定键盘,当页面有新的input标签出现时调用此方法 | () => void                     | v1.0.0+ |
| getCurrentInput | 获取当前聚焦的输入框                                         | () => HTMLInputElement \| null | v1.0.1+ |



## 其他说明

- **_有问题欢迎提交_ Issue。**
- **_本项目为作者一人维护，精力有限，有限解决重大 bug，望理解。_**
- **用于生产环境，请使用 `release` 版本代码**
- **_暂只支持`vue2.x`版本引入_**
