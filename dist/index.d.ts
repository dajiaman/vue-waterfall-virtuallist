import * as vue from 'vue';

declare const _default: vue.DefineComponent<{
    dataKey: {
        type: (StringConstructor | FunctionConstructor)[];
        required: true;
        default: never[];
    };
    /**
     * 列间距
     */
    columnGap: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 行间距
     */
    rowGap: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 数据源
     */
    dataSource: {
        type: ArrayConstructor;
        required: true;
    };
    /**
     * 数据源中width对应的key
     *
     */
    widthKey: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    /**
     * 数据源中height对应的key
     */
    heightKey: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    /**
     * 列宽度
     */
    columnWidth: {
        type: NumberConstructor;
        required: true;
    };
    /**
     * 子组件
     */
    dataComponent: {
        type: (FunctionConstructor | ObjectConstructor)[];
    };
    /**
     * 组件标签名
     */
    rootTag: {
        type: StringConstructor;
        default: string;
    };
    wrapTag: {
        type: StringConstructor;
        default: string;
    };
    wrapClass: {
        type: StringConstructor;
        default: string;
    };
    wrapStyle: {
        type: ObjectConstructor;
    };
    /**
     * 子项标签名
     */
    itemTag: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    itemClassAdd: {
        type: FunctionConstructor;
    };
    itemStyle: {
        type: ObjectConstructor;
    };
    /**
     * 上阈值
     * 避免滚动的时候渲染白屏
     */
    upThreshold: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 下阈值
     */
    downThreshold: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * toBottom阈值
     */
    bottomThreshold: {
        type: NumberConstructor;
        default: number;
    };
    footerTag: {
        type: StringConstructor;
        default: string;
    };
    footerClass: {
        type: StringConstructor;
        default: string;
    };
    footerStyle: {
        type: ObjectConstructor;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    dataKey: {
        type: (StringConstructor | FunctionConstructor)[];
        required: true;
        default: never[];
    };
    /**
     * 列间距
     */
    columnGap: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 行间距
     */
    rowGap: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 数据源
     */
    dataSource: {
        type: ArrayConstructor;
        required: true;
    };
    /**
     * 数据源中width对应的key
     *
     */
    widthKey: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    /**
     * 数据源中height对应的key
     */
    heightKey: {
        type: StringConstructor;
        default: string;
        required: true;
    };
    /**
     * 列宽度
     */
    columnWidth: {
        type: NumberConstructor;
        required: true;
    };
    /**
     * 子组件
     */
    dataComponent: {
        type: (FunctionConstructor | ObjectConstructor)[];
    };
    /**
     * 组件标签名
     */
    rootTag: {
        type: StringConstructor;
        default: string;
    };
    wrapTag: {
        type: StringConstructor;
        default: string;
    };
    wrapClass: {
        type: StringConstructor;
        default: string;
    };
    wrapStyle: {
        type: ObjectConstructor;
    };
    /**
     * 子项标签名
     */
    itemTag: {
        type: StringConstructor;
        default: string;
    };
    itemClass: {
        type: StringConstructor;
        default: string;
    };
    itemClassAdd: {
        type: FunctionConstructor;
    };
    itemStyle: {
        type: ObjectConstructor;
    };
    /**
     * 上阈值
     * 避免滚动的时候渲染白屏
     */
    upThreshold: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 下阈值
     */
    downThreshold: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * toBottom阈值
     */
    bottomThreshold: {
        type: NumberConstructor;
        default: number;
    };
    footerTag: {
        type: StringConstructor;
        default: string;
    };
    footerClass: {
        type: StringConstructor;
        default: string;
    };
    footerStyle: {
        type: ObjectConstructor;
    };
}>>, {
    dataKey: string | Function;
    columnGap: number;
    rowGap: number;
    widthKey: string;
    heightKey: string;
    rootTag: string;
    wrapTag: string;
    wrapClass: string;
    itemTag: string;
    itemClass: string;
    upThreshold: number;
    downThreshold: number;
    bottomThreshold: number;
    footerTag: string;
    footerClass: string;
}>;

export { _default as default };
