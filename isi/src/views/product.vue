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
  rounded
>
<center>
<v-img
      height="400"
      width="400"
      :src= item[0].image
          ></v-img>

      <v-col lg="8">Product: {{ item[0].name }}</v-col>
      <v-col>Brand : {{ item[0].brand }}</v-col>
      <v-col lg="8">
        Price: ${{item[0].price}}</v-col>
      <v-col lg="8">
        Voltage: {{item[0].voltage}}</v-col>
      <v-col lg="8">
        ElectricalPlug: {{item[0].electricalPlug}}</v-col>
      <v-col lg="8">
        <div v-if="item[0].outOfStock=='F'">Item avaliable Now!</div>
        <div v-else>Out Of Stock</div>
    </v-col>
    <v-btn v-if="this.$store.getters.userType == 1" @click="addToShoppingCart">Add To Shopping Cart</v-btn>
    <v-btn v-if="this.$store.getters.userType == '0'" @click="Tochangepage(productID)">Change Information</v-btn>
    <v-btn v-if="this.$store.getters.userType == '0'" @click="TochangeStock(productID)" class="ml-7">Change Stock</v-btn>
    <!-- rating and comment -->
    <v-rating
  background-color="green lighten-2"
  color="warning"
  hover
  length="5"
  readonly
  size="30"
  :value="score"
  half-increments
></v-rating>
<v-divider></v-divider>
    <!-- comment area-->
    <h1>Comment Area Below</h1>
<v-divider></v-divider>
    <v-card v-for="comment in SlicedList()" :key="comment.userID"
      v-if="comment.length!=0"
      class="mx-auto"
      max-width="344"
      outlined
    >
      <center><v-card-title>{{ comment.fName }}</v-card-title></center>
      <v-card-subtitle>Comment :{{ comment.comment }}</v-card-subtitle>
    </v-card>
<v-pagination
        v-model="page"
        :length=Math.ceil(comment.length/4)
        circle
      ></v-pagination>
  </center>
</v-sheet>
</v-container>
</template>
    
<script>
import router from '@/router'
const api = `http://localhost:8000/product/`
const rate = `http://localhost:8000/rate/`
const comment =`http://localhost:8000/comment/`
export default {
    props: ['productID'],
    data(){
       return{
        item:[],
        comment:[],
        page:1,
        NumOfRating:0,
        score:0
       }
    },
    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {
            fetch(api + this.productID).then((res)=>res.json()).then((data)=>this.item=data);
            Promise.all([fetch(rate + this.productID).then((res)=>res.json()),fetch(comment+this.productID).then((res)=>res.json())])     
  .then(([rate,comment]) => {
    console.log(rate)
    console.log(comment)
    this.score = rate[0].score
    comment.forEach(element => {
      if(element.times!=0){this.comment.push(element);};})
  })
  .catch((error) => {
    console.log(error);
  });
        },
        addToShoppingCart () {
          fetch('http://localhost:8000/product/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({userID: this.$store.getters.userID, productID:this.productID, qunantity: 1})
          })
          .then((response) => {
            if (response.status == 200) {
              window.location.reload()
            }
          });
        },
        async Tochangepage(productID) {
            router.push(`/changeInformation/${productID}`)
        },
        SlicedList(){
          let start = (this.page - 1) * 4;
          let end = start + 4
          return this.comment.slice(start,end)
        },
  TochangeStock(productID){
    fetch(`http://localhost:8000/changeStock/${productID}`, {
    method: 'PATCH',
    body: JSON.stringify({ outOfStock : this.item[0].outOfStock }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(window.location.reload())}}}


</script>