<template>
  <v-app>
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md12>
          <Search/>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md12>
          <ItemYoutube/>
        </v-flex>
      </v-layout>
    </v-container>

    <v-footer app>
      <span>EDY App &copy; Enderson Vizcaino 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Search from './components/Search'
import ItemYoutube from './components/ItemYoutube'

export default {
  data() {
    return {
      query: 'algo'
    };
  },
  components:{
    Search,
    ItemYoutube
  }
};
</script>
