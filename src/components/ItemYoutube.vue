<template>
    <v-card v-if="itemYoutube != null">
        <v-img
          :src="itemYoutube.image"
          aspect-ratio="2.75"
        ></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ itemYoutube.title }}</h3>
            <div>{{ itemYoutube.duration }}</div>
          </div>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    computed:{
        itemYoutube(){
            return this.$store.getters.getvideoInfo;
        }
    }
}
</script>
