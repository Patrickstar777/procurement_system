//index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateGoods from './components/CreateGoods.vue'
import ListGoods from './components/ListGoods.vue'
import MyGoods from './components/MyGoods.vue'
import EditGoods from './components/EditGoods.vue'
import Home from './components/Home.vue'
import Details from './components/Details.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: 'list',
            name: 'list-goods',
            component: ListGoods
        }, {
            path: 'create',
            name: 'create-goods',
            component: CreateGoods
        }, {
            path: 'my',
            name: 'my-goods',
            component: MyGoods
        }, {
            path: 'edit',
            name: 'edit-goods',
            component: EditGoods
        }, {
            path: 'details',
            name: 'details',
            component: Details
        }]

    },
]

const router = new VueRouter({
    routes
})

export default router
