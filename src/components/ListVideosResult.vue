<template>
    <div v-if="VideosSearch">
        <v-layout v-for="video in VideosSearch" :key="video.snippet.title" row>
            <v-flex xs12>
            <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs5>
                  <v-img
                    :src="video.snippet.thumbnails.high.url"
                    height="130px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title secondary-title>
                    <div>
                      <div class="headline">{{video.snippet.title}}</div>
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
