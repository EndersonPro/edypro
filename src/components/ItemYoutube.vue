<template>
<v-responsive :aspect-ratio="16/9">
<div v-if="itemYoutube != null">
    <v-layout row>
        <v-flex xs12 offset-sm2 offset-md2 offset-lg2 sm8 md8 lg8 xl8>
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
    
    <v-layout>
        <v-flex xs12 offset-sm2 offset-md2 offset-lg2 sm8 md8 lg8 xl8>
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
                            <v-list-tile-sub-title>Resolucion: {{ video.resolucion }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn fab dark color="indigo" @click="addToTailDownload(video, itemYoutube.title,'video',video.extencion, itemYoutube.image)" small>
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>

    <!-- <v-layout row fluid>
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
    </v-layout> -->
    <v-layout align-content-center>
        
        <v-flex xs12 offset-sm2 offset-md2 offset-lg2 sm8 md8 lg8 xl8>
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
                            <v-list-tile-sub-title>Bitrate: {{ audio.bitrate }}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn small fab dark color="indigo" @click="addToTailDownload(audio, itemYoutube.title, 'audio','mp3', itemYoutube.image)"> 
                                <v-icon dark>add</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</div>
 <v-snackbar
      v-model="snackbar"
      :color="color"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <!-- <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn> -->
    </v-snackbar>
</v-responsive>
</template>

<script>
/* Nota de la noche */
/*  Creo que es mejor revisa como estan funcionando la API, los resultados en cuanto a
    calidad no son los esperados, no me gusta. */

/* Nota de la misma noche */
/* Esta funcionando bien la API, el archivo se descarga correctamente... Continuar con detalles */

export default {
  data() {
    return {
      snackbar: false,
      text: "",
      y: "top",
      color:"blue darken-3",
      x: null,
      mode: "",
      timeout: 6000
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
    addToTailDownload(info, name, type, extention, img) {
      let data = { info, name, type, extention, img };
      this.snackbar = true;
      this.text = name + " Agregado a la cola de descarga";
      this.$store.dispatch("addToTailDownload", data);
    },
    /* Metodo para recomendar una descarga */
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
