<template>
<div> 
    <p class="text-xs-center">{{ value}} %</p>
    <v-progress-linear color="green darken-2" v-model="value">  </v-progress-linear>
</div>
</template>

<script>
export default {
    computed:{
        value(){
            return this.$store.getters.getValueDownload
        }
    }
    
}
</script>

