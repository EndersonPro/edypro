<template>
  <v-app>
    <v-container>
      <v-layout row wrap>
        <v-flex md12>
          <Search></Search>
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

export default {
  data() {
    return {
      query: 'algo'
    };
  },
  components:{
    Search
  }
};
</script>
