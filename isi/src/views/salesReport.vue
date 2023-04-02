<template>
    <v-cotainer>
    <v-btn outlined @click="toThirty()">Default (30 Days)</v-btn>&nbsp;
    <v-text-field v-model="searchText" label="Report period within how many days" id="serach" data-search>
        <template #append><v-btn color="secondary" type="submit" value="Subscribe" @click="search()">Check</v-btn></template>
    </v-text-field>
    <v-data-table :headers="headers" :items="displayData" :items-per-page="5" class="elevation-1" :sort-by="['quantity']" :sort-desc="[true]"></v-data-table>
    </v-cotainer>
    
  </template>

<script>
import router from '@/router'

export default {
    data: () => ({
        orderData: [],
        thirtyData: [],
        searchData: [],
        displayData: [],
        searchText: '',
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
        loadData:async function() {
            const url = 'http://localhost:8000/salesReport/'
            fetch(url)
            .then((response) => response.json())
            .then((data) => { 
                this.orderData = data

                this.thirtyData = this.check(30)
                this.displayData = this.thirtyData             
            });
        },
        check(day) {
            var time = new Date()
            var time_ts = time.getTime()
            time.setTime(time_ts - day * 24 * 60 * 60 * 1000)

            let year = time.getFullYear();
            let month = time.getMonth();
            month = ('0' + (month + 1)).slice(-2);
            let date = time.getDate();
            date = ('0' + date).slice(-2);
            const time_text = `${year}/${month}/${date}`;

            var tempList = []

            for (var x in this.orderData) {
                if (this.orderData[x].purchaseDate > time_text) {
                    tempList.push(this.orderData[x])
                }
            }
            
            var r1 = {}
            var r2 = {}

            tempList.forEach(item => {
                if(r1[item.name]){
                    r1[item.name] += item.quantity;
                }else{
                    r1[item.name] = item.quantity;
                }
            })

            tempList.forEach(item => {
                if(r2[item.name]){
                    r2[item.name] += item.amount;
                }else{
                    r2[item.name] = item.amount;
                }
            })

            var result = [];
            for(let x in r1){
                for (let y in r2) {
                    if (x == y) {
                        result.push({name: x, quantity: r1[x], amount: r2[y]})
                    }
                }
            }

            return(result)
        },
        toThirty() {
            this.displayData = this.thirtyData
        },
        search() {
            console.log(this.searchText)
            this.displayData = this.check(parseInt(this.searchText))
        },
    },
    
}
</script>