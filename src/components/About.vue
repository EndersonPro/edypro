<template>
<div>


    <v-card
      flat
      tile
    >
      <v-card-text class="white--text pt-0">
        {{msg}}
      </v-card-text>
      
      <v-divider></v-divider>
          
      <v-card flat tile class="lighten-1 white--text text-xs-center">
        <v-card-text>
            <v-btn
                v-for="s in social"
                :key="s.icon"
                :href="s.url"
                target="_blank"
                class="mx-3 white--text"
                icon>
                <v-icon size="24px">{{ s.icon }}</v-icon>
            </v-btn>
        </v-card-text>
      </v-card>

      <v-card-text class="white--text text-xs-center">
        &copy;2018 — <strong>Enderson Vizcaino</strong>
      </v-card-text>
    </v-card>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg:
        "Easy Download Youtube “EDY”, tiene un solo objetivo y es facilitarle las descarga de los videos de Youtube a los usuarios que deseen obtener un video de esta plataforma. Siente libre de usarlo a tu gusto.",
      social: [
        { icon: "fab fa-facebook", url: "https://www.facebook.com/EndersonVizcaino" },
        { icon: "fab fa-twitter", url: "https://twitter.com/Endersonj_" },
        { icon: "fab fa-github", url: "https://github.com/EndersonPro" },
        { icon: "fab fa-gitlab", url: "https://gitlab.com/EndersonPro" }

      ]
    };
  }
};
</script>
