<template>
  <v-app dark>
    <v-container align-content-center >

      <v-layout row>
        <v-flex md12 xs12>
          <v-card>
            <v-card-text>
              <p class="text-xs-center text-md-center">EDY APP</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

     <v-layout justify-center row>
       <v-flex md4 xs4>
          <Nav></Nav>
        </v-flex>
        <v-flex md8 xs8>
          <v-card>
            <router-view/>
          </v-card>
        </v-flex>
      </v-layout>
      
      <!-- <v-layout row wrap>
        <v-flex md12>
          <router-view/>
        </v-flex>
      </v-layout> -->
    </v-container>

    <v-footer app>
      <span >EdyPro App &copy; Enderson Vizcaino 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Search from "./components/Search";
import ItemYoutube from "./components/ItemYoutube";
import Nav from './components/Nav'

export default {
  data() {
    return {
      query: "algo"
    };
  },
  components: {
    Search,
    ItemYoutube,
    Nav
  }
};
</script>
