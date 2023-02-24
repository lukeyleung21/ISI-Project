<template>
<v-container fluid>
    <v-row>
    <v-col lg="8">
    <h1>Electric Appliance Shop🛒</h1>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-sheet
  color="white"
  elevation="9"
  height="800"
  rounded
  width="50%"
></v-sheet>
</v-container>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['productID'],
    data: () => ({
        
    }),

    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {

        },
    }
}

</script>