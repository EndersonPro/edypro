<template>
<div>
    <v-progress-linear v-model="value"></v-progress-linear>
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

