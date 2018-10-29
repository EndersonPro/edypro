import Vue from 'vue'
import Router from 'vue-router'
import ItemYoutube from '../components/ItemYoutube'
import Search from '../components/Search'
import Tail from '../components/TailDownload'
import About from '../components/About'


Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'Search',
            component: Search
        },
        {
            path:'/resultado',
            name:'Result',
            component: ItemYoutube
        },
        {
            path:'/cola',
            name:'Tail',
            component: Tail
        },
        {
            path:'/sobre-mi',
            name:'About',
            component: About
        }

    ],
    mode:'history'
})