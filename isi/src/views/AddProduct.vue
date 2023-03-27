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
    <v-col></v-col>
      <v-col lg="4" >
        <v-row>Product:</v-row>
        <v-row><v-text-field :rules="rulename" v-model="name"></v-text-field></v-row>
      </v-col>
      
      <v-col lg="4">
        <v-row>Brand:</v-row>
        <v-row><v-text-field :rules="rules"  v-model="brand" ></v-text-field></v-row>
      </v-col>
      <v-col lg="4">
        <v-row>Price:</v-row>
        <v-row><v-text-field  type="number" :rules="rules" label="$" v-model="price" ></v-text-field></v-row>
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
      <v-col lg="4">
        <v-row>Image</v-row>
        <v-row><v-text-field v-model="imagelink"></v-text-field></v-row>
      </v-col>
      <v-col>
        <p v-if="fail == true" style="color:red">The information have some wrong.</p>
        <p v-if="success == true" style="color:green">The information has add.</p>
      </v-col>
    <v-col>
        <v-btn class="mr-4" @click="Addtoproduct()">Commit</v-btn>
    </v-col>
</center>
</v-sheet>
</v-container>
</template>

<script>
import router from '@/router'
export default {
    data(){
       return{
        success: false,
        fail: false,
        name:'',
        brand:'',
        price:'',
        voltage:'',
        electricalPlug:'',
        imagelink:'',
        rules: [
            (value) => !!value || "Required.",
            (value) => (value || "").length <= 10 || "Max 10 characters",
        ],
        rulename: [
            (value) => !!value || "Required.",
            (value) => (value || "").length <= 25 || "Max 10 characters",
        ],
       }     
    },
    methods: {

        Addtoproduct() {
            const url = 'http://localhost:8000/AddProduct'
            fetch(url , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.name, brand: this.brand, price: this.price, voltage: this.voltage, electricalPlug: this.electricalPlug, image: this.imagelink })
            })
            .then((response) => {
                if (response.status == 200) {
                    this.success = true
                    this.fail = false
                    router.push("/");
                } else {
                    this.fail = true
                }
            })
        }
    }
}
</script>
