<template>
    <v-container>
        <v-row>
        <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date1" label="Report period starts from" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date1" @input="menu2 = false"></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date2" label="Report period ends on" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
            </v-menu>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-btn color="secondary" type="submit" value="Subscribe" @click="search()">Check</v-btn> &nbsp;
            <v-btn color="secondary" type="submit" value="Subscribe" @click="defaultSearch()">To Default (Last 30 days)</v-btn>
        </v-col>
        

        <v-spacer></v-spacer>
        </v-row>

        <v-data-table :headers="headers" :items="displayData" :items-per-page="10" class="elevation-1" :sort-by="['quantity']" :sort-desc="[true]"></v-data-table>

    </v-container>
    
  </template>

<script>
import router from '@/router'

export default {
    data: () => ({
      date1: '',
      date2: '',
      menu1: false,
      menu2: false,
      headers: [
          {
            text: 'Product',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Amount', value: 'amount' },

        ],
        orderData: [],
        displayData: [],
    }),
    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType != '0') { 
                router.push("/");
            } 
        },
        setDate() {
            var monthAgo = new Date()
            monthAgo.setDate(monthAgo.getDate() - 30)
            this.date1 = monthAgo.toISOString().substr(0, 10)
            this.date2 = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
        loadData:async function() {
            this.setDate()

            const url = 'http://localhost:8000/salesReport/'
            fetch(url)
            .then((response) => response.json())
            .then((data) => { 
                this.orderData = data
                this.search() 
            });
        },
        search() {
            var start = this.date1.replace(/-/g, "/")
            var end = this.date2.replace(/-/g, "/")
            var tempList = []
            var r1 = {}
            var r2 = {}
            var result = []

            for (var x in this.orderData) {
                if (this.orderData[x].purchaseDate >= start && this.orderData[x].purchaseDate <= end) {
                    tempList.push(this.orderData[x])
                }
            }

            tempList.forEach(item => {
                if(r1[item.name]){
                    r1[item.name] += item.quantity;
                }else{
                    r1[item.name] = item.quantity;
                }

                if(r2[item.name]){
                    r2[item.name] += item.amount;
                }else{
                    r2[item.name] = item.amount;
                }
            })

            for(let x in r1){
                for (let y in r2) {
                    if (x == y) {
                        result.push({name: x, quantity: r1[x], amount: r2[y]})
                    }
                }
            }

            this.displayData = result
        },
        defaultSearch() {
            this.setDate()
            this.search()
        }
        
    },
    
}
</script>