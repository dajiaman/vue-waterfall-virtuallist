/*!
 * Vue3-Lazyload.js v0.0.1
 * A Vue3.x image lazyload plugin
 * (c) 2023 MuRong <admin@imuboy.cn>
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):(e="undefined"!=typeof globalThis?globalThis:e||self).VueLazyload=t(e.vue)}(this,function(w){"use strict";var e={index:{type:[Number,String]},uniqueKey:{type:String},tag:{type:String,required:!0},source:{type:Object},component:{type:[Object,Function]},slotComponent:{type:Function},extraProps:{type:Object},scopedSlots:{type:Object},columnGap:{type:Number},rowGap:{type:Number}};const b=w.defineComponent({name:"waterfallVirtualListItem",props:e,data(){return{resizeObserver:void 0}},setup(d){const u=w.ref(null);return()=>{var{tag:e,component:t,source:o,slotComponent:n,index:r,columnGap:a,rowGap:i,uniqueKey:l}=d;return w.h(e||"div",{key:l,"data-key":l,ref:u,role:"listitem"},[n?w.h("div",n({item:o,index:r,scope:d})):w.h(t,{item:o,style:{paddingLeft:`${a?a/2:0}px`,paddingRight:`${a?a/2:0}px`,paddingBottom:i+"px",boxSizing:"border-box"}})])}}});return w.defineComponent({name:"waterfallVirtualList",props:{dataKey:{type:[String,Function],required:!0,default:[]},columnGap:{type:Number,default:16},rowGap:{type:Number,default:16},dataSource:{type:Array,required:!0},widthKey:{type:String,default:"width",required:!0},heightKey:{type:String,default:"height",required:!0},columnWidth:{type:Number,required:!0},dataComponent:{type:[Object,Function]},rootTag:{type:String,default:"div"},wrapTag:{type:String,default:"div"},wrapClass:{type:String,default:""},wrapStyle:{type:Object},itemTag:{type:String,default:"div"},itemClass:{type:String,default:""},itemClassAdd:{type:Function},itemStyle:{type:Object},upThreshold:{type:Number,default:200},downThreshold:{type:Number,default:200},bottomThreshold:{type:Number,default:0},footerTag:{type:String,default:"div"},footerClass:{type:String,default:"footer"},footerStyle:{type:Object}},setup(f,{slots:d,emit:a}){let t=0,u=w.ref(0),p=[],h=[],y=w.ref([]),s=w.ref(null);const{columnWidth:g,dataSource:v}=f;function o(){if(v&&0!==v.length){var e=document.documentElement.clientWidth,e=(t=e,parseInt(t/g+""));u.value!==e&&(u.value=e,l()),p=[];for(let e=0;e<u.value;e++)p.push(0)}}function i(){if(console.log("call getVisibleRange"),s&&s.value){var e=s.value,{downThreshold:t,upThreshold:o}=f;const n=Math.floor(window.scrollY-e.offsetTop-o),r=Math.floor(window.scrollY+window.innerHeight-e.offsetTop+t),a=[];h.map((e,t)=>{e.top>=r||e.bottom<=n||a.push(t)}),y.value=a}else y.value=Array.from({length:20},(e,t)=>t++)}w.watch(()=>v.length,()=>{l(),i()});const e=e=>{i();var t=document.documentElement.scrollTop,o=document.documentElement.clientHeight||document.body.clientHeight,n=document.documentElement.scrollHeight||document.body.scrollHeight,r=f["bottomThreshold"];n<=t+o+1+r&&a("tobottom")},n=e=>{o(),i()};function r(){if(v&&0!==v.length){h=[];var{widthKey:t,heightKey:o,columnGap:n,rowGap:r}=f;for(let e=0;e<v.length;e++){var a=v[e],a=a[o]/a[t],a=Math.floor(a*(g-n))+r,i=(i=p,Math.min.apply(null,i)),i=p.indexOf(i);p[i]+=a,h[e]={height:a,colIndex:i,top:p[i]-a,bottom:p[i]}}}}function l(){o(),r()}return l(),w.onMounted(()=>{document.addEventListener("scroll",e,{passive:!1}),window.addEventListener("resize",n,{passive:!1}),i()}),w.onUnmounted(()=>{document.removeEventListener("scroll",e),window.removeEventListener("resize",n)}),w.onActivated(()=>{document.addEventListener("scroll",e,{passive:!1}),window.addEventListener("resize",n,{passive:!1})}),w.onDeactivated(()=>{document.removeEventListener("scroll",e),window.removeEventListener("resize",n)}),()=>{e=p;var e=Math.max.apply(null,e),{rootTag:t,wrapTag:o,wrapClass:n,wrapStyle:r,footerTag:a,footerClass:i,footerStyle:l}=f;return w.h(t,{},[w.h(o,{ref:s,style:{position:"relative",width:g*u.value+"px",height:e+"px",...r},class:n,role:"list"},function(){var{dataComponent:t,itemTag:o,dataKey:n,columnGap:r,rowGap:a,itemClass:i,itemClassAdd:l}=f,d=[],u=y.value;for(let e=0;e<u.length;e++){var p=u[e],s=v[p],c=h[p],m="function"==typeof n?n(s):s[n];"string"==typeof m||"number"==typeof m?d.push(w.h(b,{index:p,uniqueKey:m,component:t,columnGap:r,rowGap:a,source:s,tag:o,style:{position:"absolute",left:"0px",top:"0px",width:g+"px",height:c.height+"px",transform:`translateX(${g*c.colIndex}px) translateY(${c.bottom-c.height}px)`},class:""+i+(l?" "+l(p):"")})):console.warn(`Cannot get the data-key '${n}' from data-sources.`)}return d}()),d.footer?w.h(a,{class:i,style:l},[w.renderSlot(d,"footer")]):null])}}})});
