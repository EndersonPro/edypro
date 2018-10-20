import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        listVideos:[],
        listAudios:[]
    },
    getters:{
        getListVideos: state => state.listVideos,
        getListAudios: state => state.listAudios
    },
    mutations:{
        LOAD_RESULT:(state,payload)=>{
            state.listVideos = payload.Videos
            state.listAudios = payload.Audios
        }
    },
    actions:{
        loadResult:(context, data)=>{
            var result = {
                Audios: data.audiostream,
                Videoos: data.videostream
            }
            context.commit('LOAD_RESULT', result)
        }
    }
})