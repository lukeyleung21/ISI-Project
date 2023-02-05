<template>
<v-container fluid>
<v-row>
<v-col lg="8">
<h1>Electric Appliance Shop🛒</h1>
</v-col>
<v-col>
<v-text-field
lg="6"
solo
label="Search Here🔍"
v-model="search"
></v-text-field>
</v-col>
</v-row>
<v-divider></v-divider>
Developing Here
<v-divider></v-divider>
<v-row>
<v-card v-for="item in items" max-width="400" class="mx-16 my-15">
<v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-title>{{ item.name }}</v-card-title>
    Information Here....
</v-card>
</v-row>
</v-container>
</template>

<script>
export default{
  data(){
    return{
      search : '',
      items:[{name:'test1',price:'50'},{name:'test2',price:'50'},{name:'test3',price:'50'},{name:'test4',price:'50'},{name:'test5',price:'50'}
  ]
    }
  }
}
</script>