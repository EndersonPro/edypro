<template>
<div>
  
  <v-card>
    <!-- Nota: Le quite el boton al implementar YouTube Search con el cual puedo pegar el id o
         la URL que me da el resultado, por el momento no veo necesario la funcion del boton -->
      <v-form @submit.prevent="Search(videoInfo)" ref="form" v-model="valid" lazy-validation>
          <v-layout align-center justify-center>
              <v-flex md12 xs12 sm12>
                  <v-text-field 
                      required
                      label="Busqueda / ID / URL "
                      :rules="youTubeRules"
                      v-model="query" v-on:keyup="onSearch(query)">

                  </v-text-field>
              </v-flex>
              <!-- <v-flex md3 xs3 sm3>
                  <v-btn type="submit" color="primary">Buscar 
                  </v-btn>
              </v-flex> -->
          </v-layout>

          <ListVideosResult/>
          
      </v-form>
  </v-card>

</div>
</template>

<script>
import searchYoutube from "youtube-api-v3-search";
import ListVideosResult from "./ListVideosResult";

export default {
  data() {
    return {
      query: "",
      valid: true,
      youTubeRules: [
        v =>
          !!v || "Por favor, realice una busqueda o coloque el link del video"
      ]
    };
  },
  components: {
    ListVideosResult
  },
  computed: {
    searching() {
      return this.$store.getters.getSearching;
    },
    videoInfo() {
      return this.$store.getters.getvideoInfo;
    }
  },
  methods: {
    onSearch: function(query) {
      const KEY = "AIzaSyC6n6TtDL7DoeqrNVhcf-jcCEa9Gymx1e0";

      let options = {
        q: query,
        part: "snippet",
        type: "video"
      };
      const self = this;
      searchYoutube(KEY, options).then(data => {
        var info = {
          query,
          data: data.items
        }
        this.$store.dispatch("loadListVideosResult", info);
      });
    },
    Search: function(videoInfo) {
      if (this.$refs.form.validate()) {
        /* Ejecutando accion del store */
        this.$store.dispatch("loadResult", this.query);
        /* Cambiando de ruta */

        this.$router.push({ name: "Result" });
      }
    },
    /* No la uso por ahora */
    clear: function() {
      this.$refs.form.reset();
    }
  }
};
</script>
