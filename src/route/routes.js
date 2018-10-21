import Vue from 'vue'
import Router from 'vue-router'
import ItemYoutube from '../components/ItemYoutube'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/result',
            name:'Result',
            component: ItemYoutube
        }
    ],
    mode:'history'
})