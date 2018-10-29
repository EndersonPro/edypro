<template>
    <div>
    <v-layout row>
        <v-card color="blue-grey" dark tile flat>
            <v-card-text>{{ info }}</v-card-text>
        </v-card>
    </v-layout>
    <v-layout row>
        <v-flex xs12 sm12>
            <v-card>
                <v-list two-line subheader>
                    <v-list-tile v-for="item of items" avatar :key="item.name + Math.random(99999)">
                        <v-list-tile-avatar>
                            <img :src="item.img">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.type }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn icon ripple>
                                <v-icon color="grey lighten-1">info</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-flex>
  </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "Esta es la cola de descargas, podrás descargar todos los vídeos / Audios agregados, descargar individual o eliminar cualquier ítem."
    };
  },
  computed: {
    items() {
      return this.$store.getters.gettailDownload;
    }
  }
};
</script>

