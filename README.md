# vue-waterfall-virtual-list

- support for vue3
- waterfall like pinterest

# Demo

[Demo](https://dajiaman.github.io/vue-waterfall-virtuallist/index.html)
<br/>

# Start

```
yarn add vue-waterfall-virtual-list
// or npm
npm install --save vue-waterfall-virtual-list
```

# usage

root component:

```
<template>
 <div>
    <waterfallVirtialList
      :data-key="'key'"
      :columnWidth="260"
      :data-source="list"
      :data-component="itemComponent"
      :width-key="'width'"
      :height-key="'height'"
      :columnGap="16"
      :rowGap="16"
    ></waterfallVirtialList>
 </div>
</template>

<sciprt lang="ts" setup>
  import item from './item.vue';
  // 子组件
  const itemComponent = item;

  const list = [{
    width: 100,
    height: 100,
    url: "http://demo.jpg",
  }];
</script>
```

item component

``` vue
<script lang="ts" setup>
const props = defineProps(["item"]);
</script>
// don't use lazy-load
<template>
  <div>
    <img
      :src="item['images']['474x']['url']"
      fetchpriority="auto"
      loading="auto"
    />
  </div>
</template>
```

with slot

``` vue
// you can listen tobottom event and create footer slot
<template>
 <div>
    <waterfallVirtialList
      :data-key="'key'"
      :columnWidth="260"
      :data-source="list"
      :data-component="itemComponent"
      :width-key="'width'"
      :height-key="'height'"
      :columnGap="16"
      :rowGap="16"
      :tobottom="onReachBottom"
    >
      <template #footer>loading...</template>
    </waterfallVirtialList>
 </div>
</template>
````

# Prop type

## Required props

| Prop           | Type              | Description      |
| -------------- | ----------------- | ---------------- |
| data-key       | String\|Funcntion | 唯一 key         |
| data-source    | Array             | 数组             |
| data-component | Component         | 子组件           |
| column-width   | Number            | 每列的宽度       |
| width-key      | String            | 数据中宽度的键值 |
| height-key     | String            | 数据中高度的键值 |

## Optional props

| Prop      | Type   | Description |
| --------- | ------ | ----------- |
| rowGap    | Number | 行间隔      |
| columnGap | Number | 列间隔      |

注意间隔是内边距实现的

## Others

其他的属性请查看代码

<br/>

# Thanks

[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

# License

[MIT License](https://github.com/tangbc/vue-virtual-scroll-list/blob/master/LICENSE).
