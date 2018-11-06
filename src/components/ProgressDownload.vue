<template>
<div>
    <p class="text-xs-center text-truncate"><strong class="subheading">{{ nameCurrentDownload }} Nombre de cancion Nombre de cancion Nombre de cancion Nombre de cancion Nombre de cancion </strong></p>
    <v-progress-linear color="green darken-2" v-model="value">  </v-progress-linear>
    <p class="text-xs-center">{{ value}} %</p>
</div>
</template>

<script>
export default {
  computed: {
    value() {
      return this.$store.getters.getValueDownload;
    },
    nameCurrentDownload() {
      return this.$store.getters.getnameCurrentDownload;
    }
  }
};
</script>

