//index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import ListGoods from './components/ListGoods.vue'
import ExamineGoods from './components/ExamineGoods.vue'
import NoExamineGoods from './components/NoExamineGoods.vue'
import Details from './components/Details.vue'
import Home from './components/Home.vue'

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
            path: 'examine',
            name: 'examine-goods',
            component: ExamineGoods
        }, {
            path: 'no-examine',
            name: 'no-examine-goods',
            component: NoExamineGoods
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
