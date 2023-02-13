<template>
<v-container fluid>
<v-row>
<v-col lg="8">
<h1>Electric Appliance Shop🛒</h1>
</v-col>
</v-row>
<v-divider></v-divider>
<v-row>
<v-col lg="5">
<v-card height="140px" width="500px">
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
  :items="brand"
  label="Filter here"
  v-model=filter_brand
  @change=change()
>

</v-overflow-btn>
</v-col>
</v-row>
</v-card>
</v-col>
<v-col>
  <v-card height="140px" width="500px">
<v-card-title>
Price Filter
</v-card-title>
<v-row>
<v-col lg="3">
<v-card-text>
Price:
</v-card-text>
</v-col>
<v-col lg="8">
  <v-row>
        <v-col class="px-4">
          <v-range-slider
            v-model="range"
            hide-details
            :max=static_highest
            class="align-center"
            v-if="filter_brand==''"
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>

          <v-range-slider
            v-model="range"
            hide-details
            :max=Highest_Price
            class="align-center"
            v-else
          >
            <template v-slot:prepend>
              <v-text-field
                :value="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 0, $event)"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                :value="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
                @change="$set(range, 1, $event)"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-col>
      </v-row>
</v-col>
</v-row>
</v-card>
</v-col>
</v-row>

<v-divider></v-divider>
<v-row>
<v-card v-for="item in items" max-width="400" class="mx-16 my-15" v-if="filter_brand==''">
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

<v-card v-for="item in search" max-width="400" class="mx-16 my-15" :key="item.brand && item.price">
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
      search:[

      ],
      items:[
  ],
  filter_brand:"",
  Highest_Price:100,
  static_highest:0,
  range:[0,this.Highest_Price],
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
        for(let x in this.items){
        if(this.items[x].price > this.Highest_Price){
          this.Highest_Price = this.items[x].price
        }
        this.static_highest = this.Highest_Price
    }})
  },
  methods:{
    detailRoute(){
    },
    change(){
      this.search= []
      this.Highest_Price=100
      for(let x in this.items){
        if(this.filter_brand == this.items[x].brand){
          this.search.push(this.items[x])        
        }
  
      }
      for(let x in this.search){
        if(this.search[x].price > this.Highest_Price){
          this.Highest_Price = this.search[x].price
        }
      }
      
    }
  }
  }
</script>