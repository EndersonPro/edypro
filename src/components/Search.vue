<template>
    <v-form @submit.prevent="Search()" ref="form" v-model="valid" lazy-validation>
        <v-card aling-center>
            <v-layout row>
                <v-flex md9>
                    <v-text-field 
                        required
                        outline
                        label="Busqueda"
                        :rules="youTubeRules"
                        v-model="query">
                    </v-text-field>
                </v-flex>
                <v-flex md3>
                    <v-btn outline large type="submit" color="primary">Buscar</v-btn>
                </v-flex>
            </v-layout>
        </v-card>
    </v-form>
</template>

<script>
export default {
  data() {
    return {
      query: "tUi5MUTAdG0",
      valid: true,
      youTubeRules: [
        v => !!v || "Por favor, realice una busqueda o coloque el link del video"
      ]
    };
  },
  methods: {
    Search: function() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("loadResult", this.query);
      }
    },
    /* No la uso por ahora */
    clear: function() {
      this.$refs.form.reset();
    }
  }
};
</script>
