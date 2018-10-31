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
        tailDownload: [],
        currentDownload: false,
        ValueDownload: 0,
        searching: false,
        VideosResultSearch: []
    },
    getters: {
        getListVideos: state => state.listVideos,
        getListAudios: state => state.listAudios,
        getSearch: state => state.Search,
        getvideoInfo: state => state.videoInfo,
        gettailDownload: state => state.tailDownload,
        getcurrentDownload: state => state.currentDownload,
        getValueDownload: state => state.ValueDownload,
        getSearching: state => state.searching,
        getVideosResultSearch: state => state.VideosResultSearch 
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
            state.searching = false;
            /* state.listAudios = payload.Audios
            state.listVideos = payload.Videos */
        },
        ADD_DOWNLOAD: (state, payload) => {
            state.tailDownload.push(payload)
        },
        DELETE_LIST_DOWNLOAD: (state, payload) => {
            var index = state.tailDownload.indexOf(payload);
            if (index !== -1) state.tailDownload.splice(index, 1);
        },
        CURRENT_DOWNLOAD: (state, payload) => {
            state.currentDownload = payload
        },
        LOAD_LIST_VIDEOS_RESULT:(state, payload) => {
            console.log(payload.data);
            state.VideosResultSearch = payload.query != '' ? payload.data : null
        }
    },
    actions: {
        loadResult: (context, query) => {
            context.state.searching = true;
            context.state.videoInfo = null;

            let local = 'http://127.0.0.1:5000/api/'
            let APIWEB = 'https://endersonpro.pythonanywhere.com/api/'

            axios.get(`${APIWEB}${query}`)
                .then(data => {
                    context.commit('LOAD_RESULT', data.data)
                })
                .catch(err => console.log(err))

        },
        addToTailDownload: (context, data) => {
            context.commit('ADD_DOWNLOAD', data)
        },
        deleteToTailDownload: (context, data) => {
            context.commit('DELETE_LIST_DOWNLOAD', data)
        },
        downloadItem(context, data) {
            console.log(data);
            context.commit('CURRENT_DOWNLOAD', true)

            let name = data.name,
                type = data.type,
                extention = data.extention,
                url = data.info.url

            const self = this;
            this.CurrentDownload = "Nueva descarga en curso";

            let pro = "https://cors-anywhere.herokuapp.com/";

            axios
                .get(pro + url, {
                    responseType: "blob",
                    onDownloadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable
                            ? progressEvent.total
                            : progressEvent.target.getResponseHeader("content-length") ||
                            progressEvent.target.getResponseHeader(
                                "x-decompressed-content-length"
                            );
                        if (totalLength !== null) {
                            /* Voy cambiando el valor para el progreso */
                            context.state.ValueDownload = Math.round(
                                (progressEvent.loaded * 100) / totalLength
                            );
                        }
                    }
                })
                .then(res => {
                    const url = window.URL.createObjectURL(res.data, {
                        type: `${type}/${extention}`
                    });
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", name + "." + extention);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    context.commit('CURRENT_DOWNLOAD', false)
                    context.state.ValueDownload = 0
                });
        },
        loadListVideosResult(context, data){
            context.commit('LOAD_LIST_VIDEOS_RESULT', data)
        }
    }
})