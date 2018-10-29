import Vue from 'vue'
import Router from 'vue-router'
import ItemYoutube from '../components/ItemYoutube'
import Search from '../components/Search'
import Tail from '../components/TailDownload'


Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'Search',
            component: Search
        },
        {
            path:'/result',
            name:'Result',
            component: ItemYoutube
        },
        {
            path:'/cola',
            name:'Tail',
            component: Tail
        }

    ],
    mode:'history'
})