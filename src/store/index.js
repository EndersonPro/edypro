import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { APIWEB, LOCAL, CoverURL } from '../helpers/uri'
import ID3Writer from 'browser-id3-writer';

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
        VideosResultSearch: [],
        nameCurrentDownload: '',
        error: false
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
        getVideosResultSearch: state => state.VideosResultSearch,
        getnameCurrentDownload: state => state.nameCurrentDownload,
        getError: state => state.error
    },
    mutations: {
        LOAD_RESULT: (state, payload) => {
            state.listAudios = payload.data['data'].audiostream
            state.listVideos = payload.data['data'].videostream
            state.videoInfo = {
                title: payload.data['data'].titulo,
                image: payload.img,
                duration: payload.data['data'].duracion
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
            state.currentDownload = payload.activate
            state.nameCurrentDownload = payload.name
        },
        LOAD_LIST_VIDEOS_RESULT: (state, payload) => {
            state.VideosResultSearch = payload.query != '' ? payload.data : null
        },
        ERROR: (state, payload) => {
            state.error = payload
        }
    },
    actions: {
        loadResult: ({ commit, state }, data) => {
            state.searching = true;
            state.videoInfo = null;

            axios.get(`${APIWEB}${data.id}`)
                .then(r => {
                    let videoInfo = {
                        data: r.data,
                        img: data.img
                    }
                    commit('LOAD_RESULT', videoInfo)
                })
                .catch(err => {
                    commit('ERROR', true)
                })

        },
        addToTailDownload: ({ commit }, data) => {
            commit('ADD_DOWNLOAD', data)
        },
        deleteToTailDownload: ({ commit }, data) => {
            commit('DELETE_LIST_DOWNLOAD', data)
        },
        downloadItem({ commit, state }, data) {
            /* Aca es donde hago las descargas de las canciones....  */
            /**
             *  Empezarè a implementar un funcion para poder agregarle los metadatos a los archivos descargados..
             *  NOTA: Trate de que toda esta funcion "Accion" fuese asincrona para poder usar await, pero al 
             *  momento de dar clic en descargar daba error, de esta forma funciono pero espero poder mejorarla 
             *  cuando sepa como corregir ese error. 00:40 27.01.19.
             * 
             */
            commit('CURRENT_DOWNLOAD', { activate: true, name: data.name })

            let url = data.info.url
            let { name, type, extention } = data;

            this.CurrentDownload = "Nueva descarga en curso";

            let pro = "https://cors-anywhere.herokuapp.com/";

            if(type=== 'audio' ){
                axios.get(pro + url, {
                        responseType: "arraybuffer", // Cambiar a blob en caso de que no funcione
                        onDownloadProgress: progressEvent => {
                            const totalLength = progressEvent.lengthComputable
                                ? progressEvent.total
                                : progressEvent.target.getResponseHeader("content-length") ||
                                progressEvent.target.getResponseHeader(
                                    "x-decompressed-content-length"
                                );
                            if (totalLength !== null) {
                                /* Voy cambiando el valor para el progreso */
                                state.ValueDownload = Math.round(
                                    (progressEvent.loaded * 100) / totalLength
                                );
                            }
                        }
                    })
                    .then(buffer => {
                        let writer = new ID3Writer(buffer.data);
                        /* Obtentiendo a imagen la imagen */
                        axios.get(CoverURL, { responseType: 'arraybuffer' })
                            .then(res => {
                                let coverEdy = res.data;
                                writer
                                    .setFrame("TIT2", name)
                                    .setFrame("TPE1", ["EdyPro", "EndersonPro"])
                                    .setFrame("TALB", "EdyPro")
                                    .setFrame("TYER", 2019)
                                    .setFrame("TCOP", "EdyPro © 2019")
                                    .setFrame("TBPM", 128)
                                    .setFrame("WPAY", "https://edy-pro.herokuapp.com/")
                                    .setFrame("TKEY", "Fbm")
                                    .setFrame('APIC', {
                                        type: 3,
                                        data: coverEdy,
                                        description: 'EdyPro'
                                    });
                                writer.addTag();
                                let blob = writer.getBlob();
                                return blob;
                            }).then(res => {
                                const url = window.URL.createObjectURL(res, {
                                    type: `${type}/${extention}`
                                });
                                const link = document.createElement("a");
                                link.href = url;
                                link.setAttribute("download", name + "." + extention);
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                commit('CURRENT_DOWNLOAD', false)
                                state.ValueDownload = 0
                            })
                            .then(() => {
                                commit('DELETE_LIST_DOWNLOAD', data)
                            })
                    })
            }else{
                axios
                .get(pro + url, {
                    responseType: "blob", // Cambiar a blob en caso de que no funcione
                    onDownloadProgress: progressEvent => {
                        const totalLength = progressEvent.lengthComputable
                            ? progressEvent.total
                            : progressEvent.target.getResponseHeader("content-length") ||
                            progressEvent.target.getResponseHeader(
                                "x-decompressed-content-length"
                            );
                        if (totalLength !== null) {
                            /* Voy cambiando el valor para el progreso */
                            state.ValueDownload = Math.round(
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
                    commit('CURRENT_DOWNLOAD', false)
                    state.ValueDownload = 0
                })
                .then(() => {
                    commit('DELETE_LIST_DOWNLOAD', data)
                })
            }

        },
        loadListVideosResult({ commit }, data) {
            commit('LOAD_LIST_VIDEOS_RESULT', data)
        },
        NoError({ commit }, data) {
            commit('ERROR', data)
        }
    }
})