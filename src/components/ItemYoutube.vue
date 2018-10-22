<template>
<div v-if="itemYoutube != null">
    <v-layout row wrap>
        <v-flex md12>
          <v-card >
            <v-img
            :src="itemYoutube.image"
            aspect-ratio="2.75"
            ></v-img>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ itemYoutube.title }}</h3>
                        <div>{{ itemYoutube.duration }}</div>
                    </div>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout row fluid>
        <v-flex justify-center md6>
            <span class="font-weight-light"> Progreso de descarga </span>
            <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="valueDownload"
                color="teal"
                >
                {{ valueDownload }}
            </v-progress-circular>
            <span class="font-weight-light"> {{ CurrentDownload }} </span>
        </v-flex>
    </v-layout>
    <v-layout v-if="itemYoutube != null" row fluid>
        <v-flex md6 sm12>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>Download Video</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                    <v-list-tile :class="{Recommended:downloadRecommended(video.extencion)}"
                                    v-for="video of listVideos" 
                                    :key="video.tamano">
                        <v-list-tile-content >
                            <v-list-tile-title>
                                {{  bytesToSize(video.tamano)  }}                                
                                <strong v-if="downloadRecommended(video.extencion)"> - Recomendado</strong>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>Resolucion: {{ video.resolucion }} - Extention: {{ video.extencion }} </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn @click="Download(video.url, itemYoutube.title,'video',video.extencion)" small>Descargar</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
        <v-flex md6 sm12>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>Download Mp3</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                    <v-list-tile :class="{Recommended:downloadRecommended(audio.extencion)}"
                                    v-for="audio of listAudios" 
                                    :key="audio.tamano">
                        <v-list-tile-content >
                            <v-list-tile-title>
                                {{  bytesToSize(audio.tamano)  }}                                
                                <strong v-if="downloadRecommended(audio.extencion)"> - Recomendado</strong>
                            </v-list-tile-title>
                            <v-list-tile-sub-title>Bitrate: {{ audio.bitrate }} - Extention: {{ audio.extencion }} </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn @click="Download(audio.url, itemYoutube.title, 'audio','mp3')" small>Descargar</v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>

<script>
import axios from "axios";

/* Nota de la noche */
/*  Creo que es mejor revisa como estan funcionando la API, los resultados en cuanto a
    calidad no son los esperados, no me gusta. */

/* Nota de la misma noche */
/* Esta funcionando bien la API, el archivo se descarga correctamente... Continuar con detalles */

export default {
  data() {
    return {
      valueDownload: 0,
      CurrentDownload: "Ninguna descarga en curso"
    };
  },
  computed: {
    itemYoutube() {
      return this.$store.getters.getvideoInfo;
    },
    listVideos() {
      return this.$store.getters.getListVideos;
    },
    listAudios() {
      return this.$store.getters.getListAudios;
    }
  },
  methods: {
    Download(url, name, type, extention) {
      const self = this;
      this.CurrentDownload = "Nueva descarga en curso";

      /* Me ayuda con el error del Cors Origin */
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
              self.valueDownload = Math.round(
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
          self.CurrentDownload = "Ninguna descarga en curso";
          self.valueDownload = 0;
          /* download(res.data, name + ".mp3", "audio/mp3"); */
        });
    },
    downloadRecommended(item) {
      return item == "m4a" || item == "mp4";
    },
    
    /* Metodo para que los humanos entiendan cuando pesa el archivo */
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
  }
};
</script>

<style>
.Recommended {
  background-color: #2ecc71;
}
</style>
