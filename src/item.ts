import { defineComponent, h, onMounted, onUnmounted, ref } from "vue";

const itemProps = {
  index: {
    type: [Number, String],
  },
  uniqueKey: {
    type: String,
  },
  tag: {
    type: String,
    required: true,
  },
  source: {
    type: Object,
  },
  component: {
    type: [Object, Function],
  },
  slotComponent: {
    type: Function,
  },
  extraProps: {
    type: Object,
  },
  scopedSlots: {
    type: Object,
  },
  columnGap: {
    type: Number,
  },
  rowGap: {
    type: Number,
  },
};

export const Item = defineComponent({
  name: "waterfallVirtualListItem",
  props: itemProps,
  data() {
    return {
      resizeObserver: undefined,
    };
  },
  setup(props) {
    const elRef = ref(null);

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
        uniqueKey,
      } = props;

      return h(
        tag ? tag : "div",
        { key: uniqueKey, "data-key": uniqueKey, ref: elRef, role: "listitem" },
        [
          slotComponent
            ? h(
                "div",
                slotComponent({ item: source, index: index, scope: props })
              )
            : h(component as String, {
                item: source,
                style: {
                  paddingLeft: `${columnGap ? columnGap / 2 : 0}px`,
                  paddingRight: `${columnGap ? columnGap / 2 : 0}px`,
                  paddingBottom: `${rowGap}px`,
                  boxSizing: "border-box",
                },
              }),
        ]
      );
    };
  },
});

