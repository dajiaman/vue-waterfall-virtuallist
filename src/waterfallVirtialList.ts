import {
  defineComponent,
  h,
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  reactive,
  Ref,
  ref,
  RendererElement,
  RendererNode,
  toRaw,
  VNode,
  watch,
} from "vue";
import Item from "./item";
import { getIntersection, getMax, getMin } from "./util";

export default defineComponent({
  name: "waterfallVirtualList",
  props: {
    dataKey: {
      type: [String, Function],
      required: true,
      default: [],
    },
    columnGap: {
      type: [Number],
    },
    rowGap: {
      type: [Number],
    },
    /**
     * 数据源
     */
    dataSource: {
      type: Array,
      required: true,
    },
    /**
     * 数据源中width对应的key
     *
     */
    widthKey: {
      type: String,
      default: "width",
      required: true,
    },
    /**
     * 数据源中height对应的key
     */
    heightKey: {
      type: String,
      default: "height",
      required: true,
    },
    /**
     * 列宽度
     */
    columnWidth: {
      type: Number,
      required: true,
    },
    /**
     * 子组件
     */
    dataComponent: {
      type: [Object, Function],
    },
    /**
     * 组件标签名
     */
    rootTag: {
      type: String,
      default: "div",
    },
    wrapTag: {
      type: String,
      default: "div",
    },
    wrapClass: {
      type: String,
      default: "",
    },
    wrapStyle: {
      type: Object,
    },
    /**
     * 子项标签名
     */
    itemTag: {
      type: String,
      default: "div",
    },
    itemClass: {
      type: String,
      default: "",
    },
    itemClassAdd: {
      type: Function,
    },
    itemStyle: {
      type: Object,
    },
    topThrottle: {
      type: Number,
      default: 200,
    },
    bottomThrottle: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    let containerWidth = 0;
    let columnCount = ref(0);
    let columnHeightArr: number[] = [];
    let itemList: any[] = [];
    let range: Ref<number[]> = ref([]);
    let domRef = ref(null);
    const { columnWidth, dataSource } = props;

    watch(
      () => dataSource.length,
      () => {
        init();
        // // trigger render
        getVisibleRange();
      }
    );

    // 计算有几列
    function calColumnNum() {
      if (!dataSource || dataSource.length === 0) {
        return;
      }

      const windowWidth = document.documentElement.clientWidth;
      containerWidth = windowWidth;
      const newValue = parseInt(containerWidth / columnWidth + "");

      if (columnCount.value !== newValue) {
        columnCount.value = newValue;
        // need to calculate and relayout
        init();
      }

      columnHeightArr = [];
      for (let i = 0; i < columnCount.value; i++) {
        columnHeightArr.push(0);
      }
    }

    function getVisibleRange() {
      console.log("call getVisibleRange");
      if (!domRef || !domRef.value) {
        range.value = Array.from({ length: 20 }, (_, index) => {
          return index++;
        });
        return;
      }

      const dom = domRef.value as unknown as HTMLElement;
      const { bottomThrottle, topThrottle } = props;

      // 在值内
      const top = Math.floor(window.scrollY - dom.offsetTop - topThrottle);
      const bottom = Math.floor(
        window.scrollY + window.innerHeight - dom.offsetTop + bottomThrottle
      );

      const indexs: number[] = [];
      itemList.map((item, index) => {
        if (!(item["top"] >= bottom) && !(item["bottom"] <= top)) {
          indexs.push(index);
        }
      });

      range.value = indexs;
    }

    const onScroll = (event: Event) => {
      getVisibleRange();
    };

    const onResize = (event: Event) => {
      calColumnNum();
    };

    function calPosition() {
      if (!dataSource || dataSource.length === 0) {
        return;
      }

      itemList = [];

      const { widthKey, heightKey } = props;

      for (let i = 0; i < dataSource.length; i++) {
        const item = dataSource[i] as unknown as any;
        const width = columnWidth;
        const ratio =
          (item[heightKey] as unknown as number) /
          (item[widthKey] as unknown as number);

        const height = Math.floor(ratio * columnWidth);

        const min: number = getMin(columnHeightArr);
        const index = columnHeightArr.indexOf(min);

        columnHeightArr[index] += height;
        itemList[i] = {
          height: height,
          colIndex: index,
          top: columnHeightArr[index] - height,
          bottom: columnHeightArr[index],
        };
      }
    }

    // 初始化工作
    function init() {
      calColumnNum();
      calPosition();
    }

    // start
    init();

    onMounted(() => {
      document.addEventListener("scroll", onScroll, {
        passive: false,
      });
      window.addEventListener("resize", onResize, {
        passive: false,
      });

      getVisibleRange();
    });

    onUnmounted(() => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });

    onActivated(() => {
      document.addEventListener("scroll", onScroll, {
        passive: false,
      });
      window.addEventListener("resize", onResize, {
        passive: false,
      });
    });

    onDeactivated(() => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    });

    // item slot render
    function getRenderSlots() {
      const {
        dataComponent,
        itemTag,
        dataKey,
        columnGap,
        rowGap,
        itemClass,
        itemClassAdd,
      } = props;
      const slots = [];
      const ranges = range.value;
      for (let i = 0; i < ranges.length; i++) {
        const index = ranges[i];

        const source = dataSource[index] as any;
        const item = itemList[index];
        const uniqueKey =
          typeof dataKey === "function" ? dataKey(source) : source[dataKey];

        if (typeof uniqueKey === "string" || typeof uniqueKey === "number") {
          slots.push(
            h(Item as unknown as string, {
              index: index,
              uniqueKey: uniqueKey,
              component: dataComponent,
              columnGap: columnGap,
              rowGap: rowGap,
              source: source,
              tag: itemTag,
              style: {
                position: "absolute",
                left: "0px",
                top: "0px",
                width: `${columnWidth}px`,
                height: `${item["height"]}px`,
                transform: `translateX(${
                  columnWidth * item["colIndex"]
                }px) translateY(${item["bottom"] - item["height"]}px)`,
              },
              class: `${itemClass}${
                itemClassAdd ? " " + itemClassAdd(index) : ""
              }`,
            })
          );
        } else {
          console.warn(
            `Cannot get the data-key '${dataKey}' from data-sources.`
          );
        }
      }

      return slots;
    }

    return () => {
      const height = getMax(columnHeightArr);
      const { rootTag } = props;
      console.log("render");
      return h(
        rootTag,
        {
          ref: domRef,
          id: "pin-list",
          role: "list",
          style: {
            height: `${height}px`,
            width: `${columnWidth * columnCount.value}px`,
          },
        },
        getRenderSlots()
      );
    };
  },
});
