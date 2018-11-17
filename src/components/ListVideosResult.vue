<template>
    <div v-if="VideosSearch">
        <v-layout v-for="video in VideosSearch" :key="video.id.videoId" row>
            <v-flex md12 xs12 sm12>
            <v-card color="blue-grey darken-1" class="white--text">
              <v-layout>
                <v-flex md12 xs12 sm12>
                  <v-img
                      class="white--text"
                      height="200px"
                      :src="video.snippet.thumbnails.high.url"
                    >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span class="headline">{{video.snippet.title}}</span>
                        </v-flex>
                      </v-layout>
                      <v-btn small color="green accent-3" v-on:click="loadVideo(video.id.videoId,video.snippet.thumbnails.high.url)"> Descargar <v-icon>save_alt</v-icon> </v-btn>
                    </v-container>
                  </v-img>
                 <!--  <v-img
                    :src="video.snippet.thumbnails.high.url"
                    height="130px"
                    contain
                  ></v-img> -->
                </v-flex>
                <!-- <v-flex md7 xs7 sm7>
                  <v-card-title secondary-title>
                    <div>
                      <div class="title">{{video.snippet.title}}</div>
                      <div>{{ video.snippet.channelTitle}}</div>
                      <div>{{video.snippet.publishedAt}}</div>
                    </div>
                  </v-card-title>
                </v-flex> -->
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
    </div>
</template>
<script>
export default {
  computed: {
    VideosSearch() {
      return this.$store.getters.getVideosResultSearch;
    }
  },
  methods:{
      loadVideo: function(id, img){
        let data = {
          id,
          img
        }
        this.$store.dispatch("loadResult", data);
        /* Cambiando de ruta */
        this.$router.push({ name: "Result" });
      }
  }
};
</script>
