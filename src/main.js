// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//main.js是整个应用的入口脚本
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(VueRouter); //安装vue路由插件，这个一般可用于SPA(单页面应用)的导航
Vue.use(VueResource); //安装vue-resource插件，这个插件类似与ajax，可以向后端服务器请求数据并且异步相应

let app = Vue.extend(App); //创建app组件构造器,app扩展至Vue的一个实例App，这里写app是为了方便挂载到路由上
let router = new VueRouter({ //调用构造器VueRouter，创建一个路由器实例router。
  linkActiveClass: 'active' //路由激活时，挂载的类名默认为"v-link-active",可将其修改为"active",并添加想要的样式
});

router.map({          //调用router的map方法映射路由，每条路由以key-value的形式存在，key是路径，value是组件。
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  '/seller': {
    component: seller
  }
});

router.start(app, '#app'); //路由器的运行需要一个根组件，router.start(App, '#app') 表示router会创建一个App实例，并且挂载到#app元素。
router.go('/goods'); //指定默认的路由地址
