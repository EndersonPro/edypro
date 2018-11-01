<template>
  <v-app dark>
    <v-container align-content-center>

      <v-layout row>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-card>
            <v-card-text>
              <p class="text-xs-center text-md-center display-2 font-weight-light font-italic">{{name}}</p>
              <p class="text-xs-center headline text-md-center display-2 font-weight-light font-italic">{{subname}}</p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

     <v-layout row>
       <v-flex md3 xs3 sm3 lg3 xl3>
          <Nav></Nav>
        </v-flex>
        <v-flex md9 xs9 sm9 lg9 xl9>
          <transition name="moveInUp">
            <router-view/>
          </transition>
        </v-flex>
      </v-layout>
      
      <!-- <v-layout row wrap>
        <v-flex md12>
          <router-view/>
        </v-flex>
      </v-layout> -->
    </v-container>

    <!-- <v-footer app v-if="true">

      <v-layout row>
        <v-flex md12 xs12 sm12 lg12 xl12>
          <span>EdyPro App &copy; Enderson Vizcaino 2018</span>
        </v-flex>  
      </v-layout>
      <v-layout row>
        <v-flex md12 xs12 sm12 lg12 xl12> 
          <ProgressDownload/>
        </v-flex>
      </v-layout>

    </v-footer> -->

    <v-footer
    dark
    height="auto"
    v-if="currentDownload"
  >
    <v-card class="flex" flat tile>
      <p class="text-xs-center"><strong class="subheading">{{ nameCurrentDownload }}</strong></p>
      <ProgressDownload/>
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>Enderson Vizcaino</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
  </v-app>

  
</template>

<script>
import Search from "./components/Search";
import ItemYoutube from "./components/ItemYoutube";
import Nav from "./components/Nav";
import ProgressDownload from "./components/ProgressDownload";

export default {
  data() {
    return {
      name: "EDY",
      subname:'"Easy Download YouTube"',
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    };
  },
  computed: {
    currentDownload() {
      return this.$store.getters.getcurrentDownload;
    },
    nameCurrentDownload(){
      return this.$store.getters.getnameCurrentDownload
    }
  },
  components: {
    Search,
    ItemYoutube,
    Nav,
    ProgressDownload
  }
};
</script>

<style>
.moveInUp-enter-active{
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn{
  0%{
    opacity: 0;
  }
  50%{
    opacity: 0.5;
  }
  100%{
    opacity: 1;
  }
}
</style>
