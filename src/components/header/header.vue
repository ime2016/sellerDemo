<template>

    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <!--这里的:src用了v-bind指令,动态的绑定了一个地址-->
                <img width="64" height="64" v-bind:src="seller.avatar" alt="imgae"> 
            </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送到
                </div>
                <!--如果v-if判断为false,这对应的DOM会消失而不是影藏-->
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <!--这里的:class用了v-bind指令，动态的绑定了一个值-->
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="support-count">  
                <!--@click 添加点击事件 / 用在普通元素上时，只能监听原生 DOM 事件。用在自定义元素组件上时，也可以监听子组件触发的自定义事件。-->
                <span class="count" @click="showDetail">{{seller.supports.length}}个 ></span> 
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width=100% height=100%>
        </div>
        <div class="detail" v-show="detailShow" transition="fade">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                        <v-star :size="48" :score="seller.score"></v-star>
                    </div>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">优惠信息</div>
                        <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="item in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                            <span class="text">{{seller.supports[$index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                        <div class="line"></div>
                        <div class="text">商家介绍</div>
                        <div class="line"></div>
                    </div>
                    <div class="bulletin">
                        <p class="text">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close">
                <span @click="closeDetail">x</span>
            </div>
        </div>
    </div>

</template>

<script>
    import star from "components/star/star.vue";

    export default {
        props:{     //期望使用的父组件数据的属性/接受父组件数据
            seller:{
                type: Object
            }
        },
        data(){
            return{
                detailShow:false
            }
        },
        methods:{
            showDetail(){
                this.detailShow = true;
                console.log(1)
            },
            closeDetail(){
                this.detailShow = false;
            }
        },
        created(){
            this.classMap = ['decrease','discount','guarantee','invoice','special']; //钩子函数没有明白其原理 
        },
        components:{
            'v-star':star
        }
    };
</script>

<style>
    .header {
        color: #fff;
        background: rgba(7, 17, 27, 0.5);
        position: relative;
        overflow: hidden;
        /*消除header底部图片阴影*/
    }
    
    .header .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0px;
    }
    
    .header .content-wrapper .avatar {
        display: inline-block;
        vertical-align: top;
    }
    
    .header .content-wrapper .avatar img {
        border-radius: 2px;
    }
    
    .header .content-wrapper .content {
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        font-family: '黑体';
    }
    
    .header .content-wrapper .content .title {
        margin: 2px 0 8px 0;
    }
    
    .header .content-wrapper .content .title .brand {
        display: inline-block;
        margin-top: 1px;
        vertical-align: top;
        /*把元素的顶端与行中最高元素的顶端对齐*/
        width: 30px;
        height: 18px;
        background-size: 30px 18px;
        background-repeat: no-repeat;
        background-image: url(brand@2x.png);
    }
    
    .header .content-wrapper .content .title .name {
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
    }
    
    .header .content-wrapper .content .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 200;
    }
    
    .header .content-wrapper .content .support .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 2px;
        /*把元素的顶端与行中最高元素的顶端对齐*/
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
    }
    
    .header .content-wrapper .content .support .text {
        font-size: 10px;
        line-height: 12px;
    }
    
    .decrease {
        background-image: url(decrease_1@2x.png);
    }
    
    .discount {
        background-image: url(discount_1@2x.png);
    }
    
    .guarantee {
        background-image: url(guarantee_1@2x.png);
    }
    
    .invoice {
        background-image: url(invoice_1@2x.png);
    }
    
    .special {
        background-image: url(special_1@2x.png);
    }
    
    .header .content-wrapper .support-count {
        position: absolute;
        right: 12px;
        bottom: 14px;
        height: 24px;
        padding: 0 8px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.2);
        text-align: center;
    }
    
    .header .content-wrapper .support-count .count {
        font-size: 12px;
    }
    /*公告栏样式*/
    
    .header .bulletin-wrapper {
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        background: rgba(7, 17, 27, 0.2);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /*这3个属性一起实现了无法显示表示为"..."*/
    }
    
    .header .bulletin-wrapper .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        background-image: url(bulletin@2x.png);
        background-size: 22px 12px;
        background-repeat: no-repeat;
        vertical-align: top;
        margin-top: 9px;
    }
    
    .header .bulletin-wrapper .bulletin-text {
        font-size: 10px;
        margin: 0 4px;
    }
    
    .header .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        /*层级定义*/
        filter: blur(5px);
        /*滤镜效果*/
    }
    
    .header .detail {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: auto;
        background: rgba(7, 17, 27, 0.8);
        top: 0;
        left: 0;
        transition: all 0.5s;
    }
    .fade-transtion{
        opacity:1;
        background:rgba(7,17,27,0.8);
    }
    .fade-enter,.fade-leave{
        opacity:0;
        background:rgba(7,17,27,0);
    }
    
    .header .detail .detail-wrapper {
        min-height: 100%;
        width: 100%;
    }
    
    .clearfix {
        display: inline-block;
    }
    
    .clearfix:after {
        display: block;
        content: '.';
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
    }
    
    .header .detail .detail-wrapper .detail-main {
        margin-top: 60px;
        padding-bottom: 64px;
    }
    
    .header .detail .detail-wrapper .detail-main .name {
        text-align: center;
        line-height: 16px;
        font-size: 16px;
        font-weight: 700;
        font-family: "黑体";
    }
    .header .detail .detail-wrapper .detail-main .star-wrapper{
        margin-top:18px;
        padding:2px 0;
        text-align:center;
    }
    .header .detail .detail-wrapper .detail-main .title{
        display:flex;
        width:80%;
        margin:28px auto 24px auto;
    }
    .header .detail .detail-wrapper .detail-main .title .line{
        flex:1;
        position:relative;
        top:-6px;
        border-bottom:1px solid rgba(255,255,255,0.2);
    }
    .header .detail .detail-wrapper .detail-main .title .text{
        font-size:12px;
        font-family:"黑体";
        padding:0 12px;
    }
    .header .detail .detail-wrapper .detail-main .supports{
        width:80%;
        margin:0 auto;
    }
    .header .detail .detail-wrapper .detail-main .supports .support-item{
        padding:0 12px;
        margin-bottom:12px;
        font-size:0;
    }
    .header .detail .detail-wrapper .detail-main .supports .support-item .icon{
        display: inline-block;
        width:16px;
        height:16px;
        margin-right:6px;
        background-size:16px 16px;
        background-repeat:no-repeat;
        vertical-align: top;
    }
    .header .detail .detail-wrapper .detail-main .supports .support-item .text{
        display: inline-block;
        height:16px;
        line-height:16px;
        font-size:12px;
    }
    .header .detail .detail-wrapper .detail-main .bulletin{
        width:80%;
        margin:0 auto;
    }
    .header .detail .detail-wrapper .detail-main .bulletin .text{
        font-size:12px;
        font-weight:200;
        color:rgb(255,255,255);
        line-height:24px;
    }
    .header .detail .detail-close {
        font-family: "黑体";
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
</style>