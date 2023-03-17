<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue";
import waterfallVirtialList from "../src/waterfallVirtialList";
import item from "./item.vue";
import data from "./data.ts";
import { v4 as uuidv4 } from "uuid";
const itemComponent = item;

let pinList = data;
for (let i = 0; i < 5; i++) {
  pinList = pinList.concat(pinList);
}

pinList.map((item) => {
  item["width"] = item.images.orig.width;
  item["height"] = item.images.orig.height;
  item["key"] = uuidv4();
});

let list = reactive([]);

setTimeout(() => {
  list.splice(0, 0, ...pinList);
}, 1000);
</script>

<template>
  <div style="width: 100%; padding-top: 80px">
    <div class="header">瀑布流 虚拟列表 仿pinterest demo</div>
    <waterfallVirtialList
      :data-key="'key'"
      :columnWidth="260"
      :dataSource="list"
      :data-component="itemComponent"
      :width-key="'width'"
      :height-key="'height'"
      :columnGap="16"
      :rowGap="16"
    ></waterfallVirtialList>
  </div>
</template>

<style lang="less">
#pin-list {
  position: relative;
  margin: 0 auto;
  padding-top: 50px;

  .pin {
    transition: all 0.2s;

    img {
      transition: all 0.2s ease;
    }
  }
}

.header {
  position: fixed;
  height: 40px;
  font-size: 20px;
  color: black;
  z-index: 2;
  background: white;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
