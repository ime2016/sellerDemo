<template>
  <div>
    <!--父组件数据的属性传递个子组件:seller="seller"/ v-bind 动态地绑定一个或多个 attribute，或一个组件 prop 到表达式。在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。-->
    <v-header v-bind:seller="seller"></v-header> 
    <div class="v-tab">
      <div class="tab-item">
        <!--使用v-link指令跳转到指定路径。-->
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!--在页面上使用<router-view></router-view>标签，它用于渲染匹配的组件。-->
    <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header.vue'

  export default {
    data(){
      return {
        seller:{}
      }
    },
    created(){  //在实例创建之后同步调用。此时实例已经结束解析选项，这意味着已建立：数据绑定，计算属性，方法，watcher/事件回调。但是还没有开始 DOM 编译，$el 还不存在。
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if(response.errno === 0){
          this.seller = response.data
          console.log(this.seller)
        }
      })
    },
    components: {         //局部注册组件，该组件只能用在这个App.vue组件中
      'v-header': header 
    }
  };
</script>

<style>
  .v-tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  
  .v-tab .tab-item {
    text-align: center;
    flex: 1;
  }
  
  .v-tab .tab-item a {
    display: block;
    font-size: 14px;
    text-decoration: none;
  }
  
  .active {
    color: red;
  }
</style>