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
    <v-btn v-if="this.$store.getters.userType != '0'" @click="addToShoppingCart">Add To Shopping Cart</v-btn>

</center>
</v-sheet>
</v-container>
</template>
    
<script>

const api = `http://localhost:8000/product/`
export default {
    props: ['productID'],
    data(){
       return{
        item:[]
       }
    },
    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {
            fetch(api + this.productID).then((res)=>res.json()).then((data)=>this.item=data);
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
        }
    }
}

</script>