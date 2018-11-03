<template>
    <div v-if="VideosSearch">
        <v-layout v-for="video in VideosSearch" :key="video.id.videoId" row>
            <v-flex md12 xs12 sm12>
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex md5 xs5 sm5>
                  <v-img
                    :src="video.snippet.thumbnails.high.url"
                    height="130px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex md7 xs7 sm7>
                  <v-card-title secondary-title>
                    <div>
                      <div class="title">{{video.snippet.title}}</div>
                      <div>{{ video.snippet.channelTitle}}</div>
                      <div>{{video.snippet.publishedAt}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-btn round small color="success" v-on:click="loadVideo(video.id.videoId)"> Quiero este </v-btn>
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
      loadVideo: function(id){
        this.$store.dispatch("loadResult", id);
        /* Cambiando de ruta */
        this.$router.push({ name: "Result" });
      }
  }
};
</script>
