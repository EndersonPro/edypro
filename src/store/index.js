import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Search: '',
        listVideos: [],
        listAudios: [],
        videoInfo: null
    },
    getters: {
        getListVideos: state => state.listVideos,
        getListAudios: state => state.listAudios,
        getSearch: state => state.Search,
        getvideoInfo: state => state.videoInfo
    },
    mutations: {
        LOAD_RESULT: (state, payload) => {
            state.listAudios = payload['data'].audiostream
            state.listVideos = payload['data'].videostream
            state.videoInfo = {
                title: payload['data'].titulo,
                image: payload['data'].imagen,
                duration: payload['data'].duracion
            }
            /* state.listAudios = payload.Audios
            state.listVideos = payload.Videos */
        }
    },
    actions: {
        loadResult: (context, query) => {
        
            axios.get(`http://127.0.0.1:5000/api/${query}`)
                .then(data => {
                    context.commit('LOAD_RESULT', data.data)
                })
                .catch(err => console.log(err))

        }
    }
})