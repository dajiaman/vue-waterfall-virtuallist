<script lang="ts" setup>
import { nextTick, reactive, ref } from "vue";
import waterfallVirtialList from "../src/index.ts";
import item from "./item.vue";
import data from "./data.ts";
import { v4 as uuidv4 } from "uuid";
const itemComponent = item;

let pinList = data;
pinList.map((item) => {
  item["width"] = item.images.orig.width;
  item["height"] = item.images.orig.height;
  item["key"] = uuidv4();
});

let list = reactive([]);

setTimeout(() => {
  list.splice(0, 0, ...pinList);
}, 300);

const onReachBottom = () => {
  console.log("reachBottom and loading...");
  setTimeout(() => {
    pinList.map((item) => {
      item["key"] = uuidv4();
    });
    list.splice(0, 0, ...pinList);
  }, 300);
};
</script>

<template>
  <div style="width: 100%; padding-top: 80px">
    <div class="header">瀑布流 虚拟列表 仿pinterest demo</div>
    <waterfallVirtialList
      id="pin-list"
      :data-key="'key'"
      :columnWidth="260"
      :dataSource="list"
      :data-component="itemComponent"
      :width-key="'width'"
      :height-key="'height'"
      :columnGap="16"
      :rowGap="16"
      wrapClass="list-wrapper"
      @tobottom="onReachBottom"
    >
    </waterfallVirtialList>
  </div>
</template>

<style lang="less">
#pin-list {
  position: relative;
  margin: 0 auto;
}
.list-wrapper {
  margin: 0 auto;
  position: relative;
}

.pin {
  transition: all 0.2s;

  img {
    transition: all 0.2s ease;
  }
}

.loader {
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
  border-bottom: 1px solid #ccc;
}
</style>
