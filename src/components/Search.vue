<template>
    <v-form @submit.prevent="Search()">
        <v-card>
            <v-layout row wrap>
                <v-flex md6>
                    <v-text-field required
                        label="Busqueda"
                        placeholder="Busca o coloca la url del video"
                        outline
                        
                        v-model="query">
                    </v-text-field>
                </v-flex>
                <v-flex md6>
                    <v-btn type="submit" color="primary">Buscar</v-btn>
                </v-flex>
            </v-layout>
        </v-card>
    </v-form>
</template>

<script>
export default {
  data() {
    return {
      query: "algo",
      youTubeRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ]
    };
  },
  methods: {
    Search: function() {
      console.log(this.query);
    }
  }
};
</script>
