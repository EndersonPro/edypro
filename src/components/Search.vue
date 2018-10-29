<template>
  <v-card>
      <v-form @submit.prevent="Search(videoInfo)" ref="form" v-model="valid" lazy-validation>
          <v-layout align-center justify-center>
              <v-flex md8 xs8 sm8>
                  <v-text-field 
                      required
                      label="Busqueda / ID / URL "
                      :rules="youTubeRules"
                      v-model="query">
                  </v-text-field>
              </v-flex>
              <v-flex md3 xs3 sm3>
                  <v-btn outline large type="submit" color="primary">Buscar 
                    <v-progress-circular v-if="searching"
                      :size="20"
                      color="primary"
                      indeterminate
                    ></v-progress-circular>

                  </v-btn>
                  <!-- <router-link outline large to="/result">click</router-link> -->
              </v-flex>
          </v-layout>
      </v-form>
      
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      query: "HTNGTJHPEGM",
      valid: true,
      youTubeRules: [
        v =>
          !!v || "Por favor, realice una busqueda o coloque el link del video"
      ]
    };
  },
  computed:{
    searching(){
      return this.$store.getters.getSearching
    },
    videoInfo(){
      return this.$store.getters.getvideoInfo
    }
  }
  ,
  methods: {
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
