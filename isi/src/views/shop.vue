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
  v-model=filter_brand
  @change=change()
>

</v-overflow-btn>
</v-col>

</v-row>
</v-card>
</v-col>
<v-col>
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
  filled
  persistent-hint
  :items="['Sec','Desc']"
  v-model=order
  @change=changeOrder()
>

</v-overflow-btn>
</v-col>
</v-row>
</v-card>
</v-col>
</v-row>

<v-divider></v-divider>
<v-row>
<v-card v-for="item in items[this.page-1]" max-width="400" class="mx-16 my-15" v-if="filter_brand=='All'">
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

<v-card v-for="item in search[this.page-1]" max-width="400" class="mx-16 my-15" v-if="filter_band!='All'">
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
<v-pagination
      v-model="page"
      :length=length_of_item
      circle
    ></v-pagination>
</v-container>
</template>

<script>
const api = "http://localhost:8000/shop"
export default{
  data(){
    return{
      search:[[]],
      page:1,
      total_data:0,
      length_of_item:0,
      items:[[]],
      order:"Sec",
  filter_brand:"All",
      brand:["All"],
    }
  },
  mounted:function(){
    fetch(api).then((res)=>res.json()).then((data)=> {
      this.total_data=(Math.ceil(data.length))
      this.length_of_item=(Math.ceil(data.length/6))
      let count = 0
      for(let x =0;x<=data.length-1;x+=1){
        if(x%6==0 && x!=0){
          count++
          this.items[count] =[]
        }
        this.items[count].push(data[x])
      }
      for(let x in data){
        if(this.brand.indexOf(data[x].brand)){
          this.brand.push(data[x].brand)
        }
        }
        })
  },
  methods:{
    detailRoute(){
    },
    change(){
      this.search=[[]]
      let count=0 //This for array x
      let countY=0 // This for counting x
        for(let x=0;x<this.items.length;x++){
          for(let y=0;y<this.items[x].length;y++){
            if(this.items[x][y].brand==this.filter_brand){
              if(countY>=6){count+=1}
              this.search[count].push(this.items[x][y])
              countY+=1
            }
          }
        }
        if(this.filter_brand == "All"){
        this.length_of_item=this.items.length}
        else{this.length_of_item=Math.ceil(this.search.length/6)}
    },
    changeOrder(){
      
    }
  }
  }
</script>