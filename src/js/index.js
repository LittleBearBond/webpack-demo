import utils from './common/utils';
import '../lib/bootstrap/css/bootstrap.css';
import '../css/index.scss';
import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);
// 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = {
    template: '<div> <h1>foo</h1> </div>'
}

const Bar = {
    template: '<div><h1>bar</h1></div>'
}

const Home = {
    template: '<div><h1>Home</h1><p>{{msg}}</p></div>',
    data: function () {
        return {
            msg: 'Hello, vue router!'
        }
    }
}

const About = {
    template: '<div><h1>About</h1><p>This is the tutorial about vue-router.</p></div>',
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        console.log('beforeRouteEnter')
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        console.log('beforeRouteLeave')
    }
}

const User = {
    template: `
     <div>
        <h2>User {{ $route.params.id }}</h2>
        <hr> 
        <router-view></router-view>
    </div>
    `
}
const UserHome = {
    template: '<div class="alert alert-success">Home</div>'
}
const UserProfile = {
    template: '<div class="alert alert-info">Profile</div>'
}
const UserPosts = {
    template: '<div class="alert alert-danger">Posts</div>'
}

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [{
    path: '/foo',
    component: Foo
}, {
    path: '/bar',
    component: Bar
}, {
    path: '/home',
    component: Home
}, {
    path: '/about',
    component: About,
    beforeEnter: () => {
        console.log('About beforeEnter')
    }
}, {
    path: '/user/:id',
    component: User,
    children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        {
            path: '',
            component: UserHome
        },

        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        {
            path: 'profile',
            component: UserProfile
        },

        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        {
            path: 'posts',
            component: UserPosts
        }
    ]
}]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})
router.beforeEach((to, from, next) => {
    // console.log(to, from, next)
    console.log('beforeEach')
});
router.afterEach(route => {
    // console.log(route)
    console.log('afterEach')
})


// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

const app = new Vue({
    router
}).$mount('#app');