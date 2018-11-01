<template>
    <v-card>
         <v-card-title primary-title>
            <div class="font-weight-thin font-italic">
                {{ msg }}
            </div>
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    data(){
        return {
            msg: "EDY, una sencilla aplicacion con la puedes descargar videos y audios de YouTube de forma facil, fue diseñada con mucho amor para todos los usuarios que la usen."
        }
    }
    
}
</script>
