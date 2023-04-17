<template>
  <v-container fluid>
  <v-row>
  <v-col lg="8">
  <h1>Electric Appliance Shop🛒</h1>
  </v-col>
  <v-col justify="end" v-if="this.$store.getters.userType == '0'">
    <v-text-field label="Search" id="search" data-search></v-text-field>
  </v-col>
  </v-row>
  <v-divider></v-divider>
  <v-row>
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
  <v-col class="mt-2" v-if="this.$store.getters.userType != '0'">
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
    :items="['Asec','Desc']"
    v-model=order
    @change=change()
  >
  
  </v-overflow-btn>
  </v-col>
  </v-row>
  </v-card>
  </v-col>
  </v-row>
  <v-col v-if="this.$store.getters.userType == '0'">
    <v-btn @click="ToAddProduct()">Add Product</v-btn>
  </v-col>
  <div class="mt-2">
  </div>
  <v-divider></v-divider>
  <v-row>
  
  <v-card v-for="item in search[this.page-1]" max-width="400" class="mx-16 my-15" v-bind:key="item.productID">
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
      <v-btn color="secondary" elevation="3" outlined rounded @click=toDetail(item.productID) x-large>Detail</v-btn></v-col>
      </v-card-title>
      <v-rating background-color="green lighten-2" color="warning" hover length="5" readonly size="30" :value=item.rate class="ml-16" half-increments></v-rating>
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
  const rate_api = "http://localhost:8000/rate"
  export default{
    data(){
      return{
        search:[[]],
        page:1,
        length_of_item:0, //SearchitemX
        items:[],
        items_reverse:[],
        order:"Asec",
        filter_brand:"All",
        brand:["All"],
        value:[],
        value_reverse:[],
        p_iditem:[],
        rate:[]
      }
    },
    mounted:function(){
      Promise.all([fetch(api).then((res)=>res.json()),fetch(rate_api).then((res)=>res.json())])
      .then(([data,ratedata])=> {
        function mergerData(ratedata) {
  return data.map((obj) => {
    const { productID, ...rest } = obj;
    const rateArray = ratedata.find((r) => r.productID == productID && r.times != 0 ); // 添加判断条件
    const rate = rateArray ? rateArray.score : undefined;
    return Object.assign({}, { productID, ...rest, rate });
  });
}
      data = mergerData(ratedata);
      data.sort(function(a,b){return a.price - b.price})      //sorting
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
        const searchInput = document.querySelector("[data-search]")
        searchInput.addEventListener("input", e => {
          const values = e.target.value
          if (values == '') {
          this.search=[[]]
          this.brand = ["All"]
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
          } else {
            this.value=[]
            for(let x in this.items){
              if(values == this.items[x].productID || this.items[x].name.includes(values)){
                this.value.push(this.items[x])
              }
            }
            this.value.sort(function(a,b){return a.price - b.price})            
            this.length_of_item=(Math.ceil(this.value.length/6))
            let count = 0,countT=0
            this.value_reverse = JSON.parse(JSON.stringify(this.value)).reverse()
            this.search=[[]]
            this.brand = ["All"]
            for(let x=0;x<this.value.length;x++){
              if(count>=6){count=0;countT++;this.search[countT]=[]}
                this.search[countT].push(this.value[x])
                count+=1
            }
            for(let x in this.value){
              if(this.brand.indexOf(this.value[x].brand)){
              this.brand.push(this.value[x].brand)
            }}
          }
        })

  }
      )
    },
    methods:{
      toDetail(x){
        router.push(`/product/${x}`)
      },
  
      async ToAddProduct(){
        router.push(`/AddProduct`)
      },
  
      change(){
        this.page=1
        this.search=[[]]
        if(this.filter_brand=="All"){
          if(this.order=="Asec"){
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
          }
        }
        else{
          if(this.order=="Asec"){
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
};
  </script> 