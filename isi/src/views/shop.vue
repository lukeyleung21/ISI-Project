<template>
<v-container fluid>
<v-row>
<v-col lg="8">
<h1>Electric Appliance Shop🛒</h1>
</v-col>
<v-col justify="end" v-if="this.$store.getters.userType == '0'">
  <v-text-field label="Search" id="search" data-search @input="searchID()"></v-text-field>
</v-col>
</v-row>
<v-divider></v-divider>
<v-row >
<v-col lg="5" class="mt-2">
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
  v-model=filter_brand
  @change=change()
>

</v-overflow-btn>
</v-col>

</v-row>
</v-card>
</v-col>
<v-col class="mt-2">
<v-card height="140px" width="400px">
<v-card-title>
Price Order
</v-card-title>
<v-row>
<v-col lg="3">
<v-card-text>
Price
</v-card-text>
</v-col>
<v-col lg="8">
  <v-overflow-btn
  class="mt-1"
  filled
  persistent-hint
  :items="['ASEC','Desc']"
  v-model=order
  @change=change()
>

</v-overflow-btn>
</v-col>
</v-row>
</v-card>
</v-col>
</v-row>
<div class="mt-2">
</div>
<v-divider></v-divider>
<v-row>

<v-card v-for="item in search[this.page-1]" max-width="400" class="mx-16 my-15">
<v-img :src= item.image></v-img>
    <v-row>
      <v-col lg="8"><v-card-title>{{ item.name }}</v-card-title>
      <v-card-text>
      <v-col>
        <div class="grey--text">
          ♦Brand : {{ item.brand }}
        </div></v-col></v-card-text></v-col>
      <v-col lg="4">
      <div class="mt-10" style="font-size: x-large; color: darkseagreen;">
        ${{item.price}}
      </div>
    </v-col>
</v-row>

  


    <v-divider></v-divider>
<!-- lower part -->
    <v-card-title>  
    <v-col lg="7">
    <p v-if="item.outOfStock=='F'">Product Avaliable</p>
    <p v-else>Out Of Stock</p></v-col>
    <v-col>
    <v-btn
  color="secondary"
  elevation="3"
  outlined
  rounded
  @click=toDetail(item.productID)
  x-large
>Detail</v-btn></v-col>
    </v-card-title>
    
</v-card>

</v-row>
<v-pagination
      v-model="page"
      :length=length_of_item
      circle
    ></v-pagination>
</v-container>
</template>

<script>
import router from '@/router'

const api = "http://localhost:8000/shop"
export default{
  data(){
    return{
      search:[[]],
      page:1,
      length_of_item:0, //SearchitemX
      items:[],
      items_reverse:[],
      order:"ASEC",
  filter_brand:"All",
      brand:["All"],
      value:[],
    }
  },
  mounted:function(){
    fetch(api).then((res)=>res.json()).then((data)=> {
      data.sort(function(a,b){return a.price - b.price})
      this.length_of_item=(Math.ceil(data.length/6))
      let count = 0,countT=0
      this.items = JSON.parse(JSON.stringify(data))
      this.items_reverse = JSON.parse(JSON.stringify(data)).reverse()
      for(let x=0;x<this.items.length;x++){
        if(count>=6){count=0;countT++;this.search[countT]=[]}
        this.search[countT].push(this.items[x])
        count+=1
      }
      for(let x in data){
        if(this.brand.indexOf(data[x].brand)){
          this.brand.push(data[x].brand)
        }}
      })
      const searchInput = document.querySelector("[data-search]")
      searchInput.addEventListener("input", e => {
        const values = e.target.value
        this.value=[]
        for (let x in this.items) {
          if (values == this.items[x].productID || values == this.items[x].name) {
            this.value.push(values)
            console.log(this.value)
          }
        }
      })
  },
  methods:{
    toDetail(x){
      router.push(`/product/${x}`)
    },

    searchID() {
      this.items = this.value
      //console.log(this.value)
      /*this.page=1
      this.search=[[]]
      let count = 0,countT=0
      for(let x=0;x<this.items.length;x++){
        
        if(this.items[x].productID == this.product_ID[0]){
          
          if(count>=6){count=0;countT++;this.search[countT]=[]}
          this.search[countT].push(this.items[x])
          count+=1
      }}
      console.log(this.product_ID[0])
      this.length_of_item=(Math.ceil(this.search.length))*/
    },

    change(){
      this.page=1
      this.search=[[]]
      if(this.filter_brand=="All"){
        if(this.order=="ASEC"){
          let count = 0,countT=0
          for(let x=0;x<this.items.length;x++){
          if(count>=6){count=0;countT++;this.search[countT]=[]}
          this.search[countT].push(this.items[x])
          count+=1
      }
      this.length_of_item=(Math.ceil(this.search.length))
        }
        else{
          let count = 0,countT=0
          for(let x=0;x<this.items_reverse.length;x++){
          if(count>=6){count=0;countT++;this.search[countT]=[]}
          this.search[countT].push(this.items_reverse[x])
          count+=1
      }
      this.length_of_item=(Math.ceil(this.search.length))
      console.log(this.search)
        }
      }
      else{
        if(this.order=="ASEC"){
          let count = 0,countT=0
          for(let x=0;x<this.items.length;x++){
          if(this.items[x].brand == this.filter_brand){
            if(count>=6){count=0;countT++;this.search[countT]=[]}
            this.search[countT].push(this.items[x])
            count+=1
      }}
      this.length_of_item=(Math.ceil(this.search.length))
    }
        else{
          let count = 0,countT=0
          for(let x=0;x<this.items_reverse.length;x++){
          if(this.items_reverse[x].brand == this.filter_brand){
            if(count>=6){count=0;countT++;this.search[countT]=[]}
            this.search[countT].push(this.items_reverse[x])
            count+=1
      }}
      this.length_of_item=(Math.ceil(this.search.length))
        }
    }}
  }
  }
</script>