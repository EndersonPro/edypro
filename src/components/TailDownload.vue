<template>
    <div>
        <v-btn @click="downloadAllItems(items)" ripple>
            Descargar todos (alpha)
            <v-icon color="green lighten-1">save_alt</v-icon>
        </v-btn>
    <v-layout row>
        <v-card v-if="items.length != null" color="blue-grey" dark tile flat>
            <v-card-text>{{ info }}</v-card-text>
        </v-card>
        <v-card v-else color="red lighten-2" dark tile flat>
            <v-card-text>{{ err }}</v-card-text>
        </v-card>
        
    </v-layout>
    <v-layout row>
        <v-flex xs12 sm12 md12 lg12 xl12>
            <v-card>
                <v-list two-line subheader>
                    <v-list-tile v-for="item of items" avatar :key="item.name + Math.random(99999)">
                        <v-list-tile-avatar>
                            <img :src="item.img">
                        </v-list-tile-avatar>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ item.type }} | {{ item.extention }} | {{ item.info.resolucion }} | {{ bytesToSize(item.info.tamano) }}</v-list-tile-sub-title>
                        </v-list-tile-content>


                        <v-list-tile-action >
                            <v-btn @click="downloadItem(item)"  icon ripple>
                                <v-icon color="green lighten-1">save_alt</v-icon>
                            </v-btn>
                        </v-list-tile-action>

                        <v-list-tile-action >
                            <v-btn @click="deleteItem(item)" icon ripple>
                                <v-icon color="red lighten-1">delete</v-icon>
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
      info:
        "Esta es la cola de descargas, podrás descargar todos los vídeos / Audios agregados, descargar individual o eliminar cualquier ítem.",
      err:
        "No hay nada agregado en la cola de descarga, por favor realice una busqueda y agrege algo para descargar.. Estamos ansiosos por descargar :)"
    };
  },
  computed: {
    items() {
      return this.$store.getters.gettailDownload;
    }
  },
  methods: {
    deleteItem(item) {
      this.$store.dispatch("deleteToTailDownload", item);
    },
    downloadItem(item) {
      this.$store.dispatch("downloadItem", item);
      /* this.deleteItem(item) */
    },
    downloadAllItems(items) {
      items.forEach(item => {
        this.$store.dispatch("downloadItem", item);
      });
    },
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
  }
};
</script>

