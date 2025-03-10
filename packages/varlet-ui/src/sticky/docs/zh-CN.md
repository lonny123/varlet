# 粘性布局

### 介绍
粘性布局默认使用监听容器滚动事件的`scroll`模式，如有需要可以切换成基于`css sticky`的模式来提升性能。

### 引入

```js
import { createApp } from 'vue'
import { Sticky } from '@varlet/ui'

createApp().use(Sticky)
```

### 基本使用

```html
<var-sticky :offset-top="50">
  <var-button type="primary">基本使用</var-button>
</var-sticky>
```

### 局部吸顶

```html
<div class="scroller">
  <var-sticky>
    <var-button type="success">局部吸顶</var-button>
  </var-sticky>
  <div class="block"></div>
</div>
```

```less
.scroller {
  height: 200px;
  overflow: auto;
  background: #2979ff;

  .block {
    width: 100%;
    height: 600px;
    background: #2979ff;
    opacity: .5;
  }
}
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `offset-top` | 吸顶距离 | _string \| number_ | `0` |
| `z-index` | 吸顶时的层级 | _string \| number_ | `0` |
| `css-mode` | 开启原生`css sticky`模式 | _boolean_ | `false` |
| `disabled` | 禁用吸顶, 设置为`true`时, 元素会回到文档流中 | _boolean_ | `false` |

### 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| `scroll` | 当滚动容器滚动时触发 | 距离顶部px值`offsetTop: number` 是否吸顶`isFixed: boolean` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 粘性布局的内容 | `-` |