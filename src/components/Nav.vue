<template>
  <v-navigation-drawer permanent>
    <v-list dense class="pt-0">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="moveToRoute(item.name)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          

            <v-list-tile-title>{{ item.title }}</v-list-tile-title>

        </v-list-tile-content>
              <v-badge left v-if="item.title == 'Agregados'">
                <span slot="badge">{{ tail }}</span>
              </v-badge>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed:{
    tail(){
      return this.$store.getters.gettailDownload.length
    }
  },
  data() {
    return {
      items: [
        { title: "Buscar", icon: "search", name: "Search" },
        { title: "Agregados", icon: "reorder", name: "Tail" },
        { title: "Sobre mi", icon: "info", name: "About" }
      ],
      right: null
    };
  },
  methods:{
    moveToRoute(name){
      this.$router.push({ name });
    }
  }
};
</script>
