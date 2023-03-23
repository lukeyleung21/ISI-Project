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
  height="950"
  rounded
>
<center>
<v-img
      height="400"
      width="400"
      :src= item[0].image
          ></v-img>

      <v-col lg="4" >
        <v-row>Product:</v-row>
        <v-row><v-text-field v-model="item[0].name"></v-text-field></v-row>
      </v-col>
      
      <v-col lg="4">
        <v-row>Brand:</v-row>
        <v-row><v-text-field v-model="item[0].brand" ></v-text-field></v-row>
      </v-col>
      <v-col lg="4">
        <v-row>Price:</v-row>
        <v-row><v-text-field label="$" v-model="item[0].price" ></v-text-field></v-row>
      </v-col>
      <v-col lg="4">
        <v-row>Voltage:</v-row>
        <v-row><select v-model="voltage">
                <option disabled value="">Please select one</option>
                <option>220</option>
                <option>110</option>
            </select></v-row>
      </v-col>
      <v-col lg="4">
        <v-row>ElectricalPlug:</v-row>
            <v-row><select v-model="electricalPlug">
                <option disabled value="">Please select one</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>E</option>
            </select></v-row>
      </v-col>
    <v-col>
        <v-btn @click="changeValue()">Commit</v-btn>
    </v-col>
</center>
</v-sheet>
</v-container>
</template>

<script>
import router from '@/router'

const api = `http://localhost:8000/product/`
export default {
    props: ['productID'],
    data(){
       return{
        item:[],
        voltage:'',
        electricalPlug:''
       }
    },
    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {
            fetch(api + this.productID).then((res)=>res.json()).then((data)=>this.item=data);
        },
        changeValue() {
            console.log(this.voltage)
            const url = 'http://localhost:8000/changePV/'
            fetch(url + this.productID, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productID: this.productID, item: this.item, voltage: this.voltage, electricalPlug: this.electricalPlug })
            })
            .then((response) => {
                if (response.status == 200) {
                    
                }
            })
        }
    }
}
</script>
