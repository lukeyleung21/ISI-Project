<template>
    <v-container fluid>
    <v-row>
    <v-col lg="8">
    <h1>Rating and Comment</h1>
    </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-sheet
  color="white"
  elevation="9"
  height="950"
  rounded
>
<center>

<v-img height="400" width="400" :src= item[0].image></v-img>

      <v-col lg="8">Product: {{ item[0].name }}</v-col>
      <v-col>Brand : {{ item[0].brand }}</v-col>

    <v-col></v-col>
      <v-col lg="4" >
        <v-select label="Rating (Required)" :items="['1', '2', '3', '4', '5']" v-model="rating"></v-select>
        <p align="left" style="color:red" v-if="this.errorDisplay == true">The rating is Required.</p>
      </v-col>
      
      <v-col lg="4">
        <v-row>Comment:</v-row>
        <v-row><v-text-field v-model="comment"></v-text-field></v-row>
      </v-col>
      
    <v-col>
        <v-btn class="mr-4" @click="submit()">Submit</v-btn>
    </v-col>
</center>
</v-sheet>
</v-container>
</template>

<script>
import router from '@/router'

export default {
    props: ['POIID', 'productID'],
    data: () => ({
        item: [],
        rating: 0,
        comment: '',
        errorDisplay: false,
    }),

    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '0') {
                router.push("/purchaseOrder")
            } else if (this.$store.getters.userType == '2') { 
                router.push("/login");
            } else {
                fetch(`http://localhost:8000/rcCheck/${this.POIID}/${this.productID}/${this.$store.getters.userID}`)
                .then(response => response.json())
                .then(data => {
                    if(data[0] == undefined || data[0].times != 0) {
                        this.$router.push("/purchaseTracking")
                    }
                })
            }
        },
        loadData:async function() {
            const api = `http://localhost:8000/product/`
            fetch(api + this.productID)
            .then(response => response.json())
            .then(data => {
                this.item=data
            })
        },
        async submit(){
            if (this.rating == 0) {
                this.errorDisplay = true
                return
            } 

            fetch(`http://localhost:8000/rcSubmit/${this.POIID}/${this.productID}/${this.$store.getters.userID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: this.rating, comment: this.comment })
            })
            .then(response => response.json())
            .then(data => {
                this.$router.push(`/purchaseTrackingDetail/${data[0].POID}`)
            })


        },

    },
}

</script>
