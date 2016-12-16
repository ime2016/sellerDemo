<template>
    <div class="goods" >
        <div class="menu-wrapper" v-el:menu-wrapper> 
            <ul>
                <li v-for="item in goods" @touchend="selectMenu($index)" class="menu-item" :class="{'current':currentIndex === $index}">
                    <span class="text">
                        <span v-show="item.type > 0" class="icon"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <!--v-el:foo  为DOM元素注册一个索引，方便通过所属实例的$els访问这个元素 ， 这里不能使用驼峰命名 -->
        <div class="foods-wrapper" v-el:food-wrapper>
            <ul>
                <li class="foods-list food-list-hook" v-for="item in goods">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="food in item.foods">
                            <div class="icon">
                                <img :src="food.icon" alt="" height=57 width=57>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="new">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import BScroll from 'better-scroll'

    const ERR_OK = 0;
    export default {

        props:{
            seller:{
                type:Object
            }
        },
        data(){
            return {
                goods:[],
                listHeight:[],
                scrollY:0
            }
        },
        created(){
            this.$http.get('/api/goods').then((response) => {
                response = response.body
                if(response.errno === ERR_OK){
                    this.goods = response.data
                    this.$nextTick(() => {
                        this._initScroll()
                        this._calculateHeight()
                    })
                    console.log(response.data)
                }
            })
        },
        computed:{
            currentIndex(){
                for (var i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i+1]
                    if(!height2 || (this.scrollY>=height1 && this.scrollY < height2)){

                        return i

                    }
                }
            }
        },
        methods:{
            _initScroll(){
                this.menuScroll = new BScroll(this.$els.menuWrapper,{})
                this.foodScroll = new BScroll(this.$els.foodWrapper,{
                    probeType:3
                })
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight(){
                let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
                let height = 0
                this.listHeight.push(height)
                for (var i = 0; i < foodList.length; i++) {
                    let item = foodList[i]
                    height+=item.clientHeight
                    this.listHeight.push(height)
                }
            },
            selectMenu(index){
            
                console.log(index)
                
                let foodList = this.$els.foodWrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]
                this.foodScroll.scrollToElement(el, 300)

            }
        }
    };
</script>

<style>
    .goods {
        display: flex;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
        font-family: "黑体";

    }
    
    .goods .menu-wrapper {
        width: 80px;
        flex: 0 0 80px;
        background: #f3f5f7;
    }
    
    .goods .foods-wrapper {
        flex: 1;
    }
    
    .goods .foods-wrapper .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background-color: #f3f5f7;
    }
    
    .goods .foods-wrapper .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.2);
    }
    
    .goods .foods-wrapper .food-item .icon {
        flex: 0 0 57px;
        margin-right: 10px;
        border-radius: 1px;
    }
    
    .goods .foods-wrapper .food-item .icon img {
        border-radius: 2px;
    }
    
    .goods .foods-wrapper .food-item .content {
        flex: 1;
    }
    
    .goods .foods-wrapper .food-item .content .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgba(7, 17, 27);
    }
    
    .goods .foods-wrapper .food-item .content .desc,
    .extra {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(14, 153, 159);
    }
    
    .goods .foods-wrapper .food-item .content .extra .count {
        margin-right: 12px;
    }
    
    .goods .foods-wrapper .food-item .price {
        line-height: 24px;
    }
    
    .goods .foods-wrapper .food-item .price .new {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    
    .goods .foods-wrapper .food-item .price .old {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .goods .menu-wrapper .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding-left: 12px;
    }
    .current{
        position: relative;
        background:rgb(98,189,193);
        z-index: 10;
        font-weight: 700;
    }
    
    .goods .menu-wrapper .menu-item .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    }
</style>