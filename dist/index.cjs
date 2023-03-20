'use strict';

const vue = require('vue');

const itemProps = {
  index: {
    type: [Number, String]
  },
  uniqueKey: {
    type: String
  },
  tag: {
    type: String,
    required: true
  },
  source: {
    type: Object
  },
  component: {
    type: [Object, Function]
  },
  slotComponent: {
    type: Function
  },
  extraProps: {
    type: Object
  },
  scopedSlots: {
    type: Object
  },
  columnGap: {
    type: Number
  },
  rowGap: {
    type: Number
  }
};
const Item = vue.defineComponent({
  name: "waterfallVirtualListItem",
  props: itemProps,
  data() {
    return {
      resizeObserver: void 0
    };
  },
  setup(props) {
    const elRef = vue.ref(null);
    return () => {
      const {
        tag,
        scopedSlots,
        component,
        source,
        slotComponent,
        index,
        columnGap,
        rowGap,
        uniqueKey
      } = props;
      return vue.h(
        tag ? tag : "div",
        { key: uniqueKey, "data-key": uniqueKey, ref: elRef, role: "listitem" },
        [
          slotComponent ? vue.h(
            "div",
            slotComponent({ item: source, index, scope: props })
          ) : vue.h(component, {
            item: source,
            style: {
              paddingLeft: `${columnGap ? columnGap / 2 : 0}px`,
              paddingRight: `${columnGap ? columnGap / 2 : 0}px`,
              paddingBottom: `${rowGap}px`,
              boxSizing: "border-box"
            }
          })
        ]
      );
    };
  }
});

const getMin = (arr) => {
  return Math.min.apply(null, arr);
};
const getMax = (arr) => {
  return Math.max.apply(null, arr);
};

const index = vue.defineComponent({
  name: "waterfallVirtualList",
  props: {
    dataKey: {
      type: [String, Function],
      required: true,
      default: []
    },
    /**
     * 列间距
     */
    columnGap: {
      type: Number,
      default: 16
    },
    /**
     * 行间距
     */
    rowGap: {
      type: Number,
      default: 16
    },
    /**
     * 数据源
     */
    dataSource: {
      type: Array,
      required: true
    },
    /**
     * 数据源中width对应的key
     *
     */
    widthKey: {
      type: String,
      default: "width",
      required: true
    },
    /**
     * 数据源中height对应的key
     */
    heightKey: {
      type: String,
      default: "height",
      required: true
    },
    /**
     * 列宽度
     */
    columnWidth: {
      type: Number,
      required: true
    },
    /**
     * 子组件
     */
    dataComponent: {
      type: [Object, Function]
    },
    /**
     * 组件标签名
     */
    rootTag: {
      type: String,
      default: "div"
    },
    wrapTag: {
      type: String,
      default: "div"
    },
    wrapClass: {
      type: String,
      default: ""
    },
    wrapStyle: {
      type: Object
    },
    /**
     * 子项标签名
     */
    itemTag: {
      type: String,
      default: "div"
    },
    itemClass: {
      type: String,
      default: ""
    },
    itemClassAdd: {
      type: Function
    },
    itemStyle: {
      type: Object
    },
    /**
     * 上阈值
     * 避免滚动的时候渲染白屏
     */
    upThreshold: {
      type: Number,
      default: 200
    },
    /**
     * 下阈值
     */
    downThreshold: {
      type: Number,
      default: 200
    },
    /**
     * toBottom阈值
     */
    bottomThreshold: {
      type: Number,
      default: 0
    },
    footerTag: {
      type: String,
      default: "div"
    },
    footerClass: {
      type: String,
      default: "footer"
    },
    footerStyle: {
      type: Object
    }
  },
  setup(props, { slots, emit }) {
    let containerWidth = 0;
    let columnCount = vue.ref(0);
    let columnHeightArr = [];
    let itemList = [];
    let range = vue.ref([]);
    let domRef = vue.ref(null);
    const { columnWidth, dataSource } = props;
    vue.watch(
      () => dataSource.length,
      () => {
        init();
        getVisibleRange();
      }
    );
    function calColumnNum() {
      if (!dataSource || dataSource.length === 0) {
        return;
      }
      const windowWidth = document.documentElement.clientWidth;
      containerWidth = windowWidth;
      const newValue = parseInt(containerWidth / columnWidth + "");
      if (columnCount.value !== newValue) {
        columnCount.value = newValue;
        init();
      }
      columnHeightArr = [];
      for (let i = 0; i < columnCount.value; i++) {
        columnHeightArr.push(0);
      }
    }
    function getVisibleRange() {
      if (!domRef || !domRef.value) {
        range.value = Array.from({ length: 20 }, (_, index) => {
          return index++;
        });
        return;
      }
      const dom = domRef.value;
      const { downThreshold, upThreshold } = props;
      const top = Math.floor(window.scrollY - dom.offsetTop - upThreshold);
      const bottom = Math.floor(
        window.scrollY + window.innerHeight - dom.offsetTop + downThreshold
      );
      const indexs = [];
      itemList.map((item, index) => {
        if (!(item["top"] >= bottom) && !(item["bottom"] <= top)) {
          indexs.push(index);
        }
      });
      range.value = indexs;
    }
    const onScroll = (event) => {
      getVisibleRange();
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const { bottomThreshold } = props;
      if (scrollTop + clientHeight + 1 + bottomThreshold >= scrollHeight) {
        emit("tobottom");
      }
    };
    const onResize = (event) => {
      calColumnNum();
      getVisibleRange();
    };
    function calPosition() {
      if (!dataSource || dataSource.length === 0) {
        return;
      }
      itemList = [];
      const { widthKey, heightKey, columnGap, rowGap } = props;
      for (let i = 0; i < dataSource.length; i++) {
        const item = dataSource[i];
        const ratio = item[heightKey] / item[widthKey];
        const height = Math.floor(ratio * (columnWidth - columnGap)) + rowGap;
        const min = getMin(columnHeightArr);
        const index = columnHeightArr.indexOf(min);
        columnHeightArr[index] += height;
        itemList[i] = {
          height,
          colIndex: index,
          top: columnHeightArr[index] - height,
          bottom: columnHeightArr[index]
        };
      }
    }
    function init() {
      calColumnNum();
      calPosition();
    }
    init();
    vue.onMounted(() => {
      document.addEventListener("scroll", onScroll, {
        passive: false
      });
      window.addEventListener("resize", onResize, {
        passive: false
      });
      getVisibleRange();
    });
    vue.onUnmounted(() => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });
    vue.onActivated(() => {
      document.addEventListener("scroll", onScroll, {
        passive: false
      });
      window.addEventListener("resize", onResize, {
        passive: false
      });
    });
    vue.onDeactivated(() => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });
    function getRenderSlots() {
      const {
        dataComponent,
        itemTag,
        dataKey,
        columnGap,
        rowGap,
        itemClass,
        itemClassAdd
      } = props;
      const slots2 = [];
      const ranges = range.value;
      for (let i = 0; i < ranges.length; i++) {
        const index = ranges[i];
        const source = dataSource[index];
        const item = itemList[index];
        const uniqueKey = typeof dataKey === "function" ? dataKey(source) : source[dataKey];
        if (typeof uniqueKey === "string" || typeof uniqueKey === "number") {
          slots2.push(
            vue.h(Item, {
              index,
              uniqueKey,
              component: dataComponent,
              columnGap,
              rowGap,
              source,
              tag: itemTag,
              style: {
                position: "absolute",
                left: "0px",
                top: "0px",
                width: `${columnWidth}px`,
                height: `${item["height"]}px`,
                transform: `translateX(${columnWidth * item["colIndex"]}px) translateY(${item["bottom"] - item["height"]}px)`
              },
              class: `${itemClass}${itemClassAdd ? " " + itemClassAdd(index) : ""}`
            })
          );
        } else {
          console.warn(
            `Cannot get the data-key '${dataKey}' from data-sources.`
          );
        }
      }
      return slots2;
    }
    return () => {
      const height = getMax(columnHeightArr);
      const {
        rootTag,
        wrapTag,
        wrapClass,
        wrapStyle,
        footerTag,
        footerClass,
        footerStyle
      } = props;
      return vue.h(rootTag, {}, [
        vue.h(
          wrapTag,
          {
            ref: domRef,
            style: {
              position: "relative",
              width: `${columnWidth * columnCount.value}px`,
              height: `${height}px`,
              ...wrapStyle
            },
            class: wrapClass,
            role: "list"
          },
          getRenderSlots()
        ),
        // footer slot
        slots.footer ? vue.h(
          footerTag,
          {
            class: footerClass,
            style: footerStyle
          },
          [vue.renderSlot(slots, "footer")]
        ) : null
      ]);
    };
  }
});

module.exports = index;
