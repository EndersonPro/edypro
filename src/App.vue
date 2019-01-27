<template>
  <v-app dark>
    <v-container align-content-center>
      <v-layout row>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-card>
            <v-card-text>
              <p class="text-xs-center display-2 font-weight-light font-italic">{{name}}
                <span class="text-xs-center headline text-md-center body-2 font-weight-light font-italic">{{subname}}</span>
              </p>
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

    <v-snackbar
      v-model="error"
      :color="color"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="NoError()"
      >
        Cerrar
      </v-btn>
    </v-snackbar>


    <v-footer
    dark
    app
    height="auto"
    v-if="currentDownload"
  >
    <v-card class="flex" flat tile>
      <ProgressDownload/>
      <!-- <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>Enderson Vizcaino</strong>
      </v-card-actions> -->
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
      subname: '"Easy Download YouTube"',
      color: "red darken-2",
      mode: "",
      timeout: 0,
      text:
        "Ha ocurrido un error al obtener los detalles de la cancion, intente nuevamente por favor o elija otro video"
    };
  },
  computed: {
    currentDownload() {
      return this.$store.getters.getcurrentDownload;
    },
    error() {
      return this.$store.getters.getError;
    }
  },
  methods: {
    NoError() {
      this.$store.dispatch("NoError", false);
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
.moveInUp-enter-active {
  animation: fadeIn 1s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
