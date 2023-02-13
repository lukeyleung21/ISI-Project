<template>
<v-container fluid>
<v-row>
<v-col lg="8">
<h1>Electric Appliance Shop🛒</h1>
</v-col>
</v-row>
<v-divider></v-divider>
<!-- Filter Here -->
<v-row>
<v-col lg="5">
<v-card>
<v-card-title>
Brand Filter
</v-card-title>
<v-row>
<v-col lg="3">
<v-card-text>
Brand:
</v-card-text>
</v-col>
<v-col lg="8">
  <v-overflow-btn
  filled
  persistent-hint
  class="mx-10"
  :items="brand"
  label="Filter here"
  :value="filter_brand"
>

</v-overflow-btn>
</v-col>
</v-row>
</v-card>
</v-col>
</v-row>

<v-divider></v-divider>
<v-row>
<v-card v-for="item in items" max-width="400" class="mx-16 my-15" v-if="filter_brand=='' " >
<v-img
      height="250"
      width="450"
      :src= item.image
          ></v-img>
    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      ><v-col>
        <div class="grey--text">
          ♦Brand : {{ item.brand }}
        </div></v-col>    </v-row>    </v-card-text>
        <v-card-title>
              <div class="mt-5" style="font-size: x-large; color: darkseagreen;">
        ${{item.price}}
      </div></v-card-title>
  


    <v-divider></v-divider>

    <v-card-title>
    <p v-if="!item.outOfStock">Product Avaliable</p>
    <p v-else>Out Of Stock</p>
    </v-card-title>

    <v-card-text>
      <v-row>
          <v-col
            cols="6"
            sm="3"
          >Favourite
            <v-btn
              icon
              color="pink"
              class="ml-3"
              @click="favourite(items.productID)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>
          <v-col
          cols="6"
            sm="3">

          </v-col>
   <v-btn
  color="secondary"
  elevation="3"
  outlined
  rounded
  x-large
  @click="detailRoute()"
>Detail</v-btn>
          </v-row>

    </v-card-text>
    
</v-card>
</v-row>
</v-container>
</template>

<script>
const api = "http://localhost:8000/shop"
export default{
  data(){
    return{
      search:{
        brand:'',
        price1:0,
        price2:0,
      },
      items:[

  ],
      overlay :false,
      filter_brand: "",
      brand:[""]
    }
  },
  mounted:function(){
    fetch(api).then((res)=>res.json()).then((data)=> {
      this.items = data
      for(let x in data){
        if(this.brand.indexOf(data[x].brand)){
          this.brand.push(data[x].brand)
        }
      }
    })
  },
  methods:{
    detailRoute(){
      console.log(this.filt1er_brand)
    }
  },
  }
</script>