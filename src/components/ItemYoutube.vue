<template>
<div>
    <v-layout v-if="itemYoutube != null" row wrap>
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
        <v-flex md12>
            <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="valueDownload"
                color="teal"
                >
                {{ valueDownload }}
            </v-progress-circular>
        </v-flex>
    </v-layout>
    <v-layout v-if="itemYoutube != null" row fluid>
        <v-flex md6 sm12>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>Download Video</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </v-card>
        </v-flex>
        <v-flex md6 sm12>
            <v-card>
                <v-toolbar color="cyan" dark>
                    <v-toolbar-title>Download Mp3</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                    <v-list-tile v-for="audio of listAudios" :key="audio.tamano">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ audio.tamano }}</v-list-tile-title>
                            <v-list-tile-sub-title>Bitrate: {{ audio.bitrate }} - Extention: {{ audio.extencion }} </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn @click="Download(audio.url, itemYoutube.title)" small>Descargar</v-btn>
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
import download from "downloadjs";

/* Nota de la noche */
/*  Creo que es mejor revisa como estan funcionando la API, los resultados en cuanto a
    calidad no son los esperados, no me gusta. */

export default {
  data() {
    return {
      valueDownload: 0
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
    Download(url, name) {
      const self = this;
      axios
        .get(url, {
          responseType: "blob",
          onDownloadProgress: progressEvent => {
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            if (totalLength !== null) {
              self.valueDownload = Math.round((progressEvent.loaded * 100) / totalLength)
            }
          }
        })
        .then(res => {
          download(res.data, name + ".mp3", "audio/mp3");
        });
    },
    updateProgress(evt) {
      if (evt.lengthComputable) {
        var percentComplete = (evt.loaded / evt.total) * 100;
        console.log(percentComplete + "% completed");
      }
    }
  }
};
</script>
