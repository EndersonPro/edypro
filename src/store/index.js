import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Search: '',
        listVideos: [],
        listAudios: [],
        videoInfo: null,
        tailDownload: []
    },
    getters: {
        getListVideos: state => state.listVideos,
        getListAudios: state => state.listAudios,
        getSearch: state => state.Search,
        getvideoInfo: state => state.videoInfo,
        gettailDownload: state=>state.tailDownload
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
        },
        ADD_DOWNLOAD: (state, payload) =>{
            state.tailDownload.push(payload)
        },
        DELETE_LIST_DOWNLOAD:(state, payload)=>{
            var index = state.tailDownload.indexOf(payload);
            if (index !== -1) state.tailDownload.splice(index, 1);
        }
    },
    actions: {
        loadResult: (context, query) => {
            let local = 'http://127.0.0.1:5000/api/'
            let APIWEB = 'https://endersonpro.pythonanywhere.com/api/'

            axios.get(`${APIWEB}${query}`)
                .then(data => {
                    context.commit('LOAD_RESULT', data.data)
                })
                .catch(err => console.log(err))

        },
        addToTailDownload: (context, data)=>{
            context.commit('ADD_DOWNLOAD', data)
        },
        deleteToTailDownload: (context, data)=>{
            context.commit('DELETE_LIST_DOWNLOAD', data)
        }
    }
})