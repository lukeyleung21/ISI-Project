<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">Staus</th>
        <th class="text-left">P.O numbers</th>
        <th class="text-left">Name</th>
        <th class="text-left">Amount</th>
        <th class="text-left">Purchase Dates</th>
        <th class="text-left">Operation</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="Data in data" :key="Data.status">
            <td>{{ Data.status }}</td>
            <td>{{ Data.POID }}</td>
            <td>{{ Data.fName }}</td>
            <td>{{ Data.totalAmount }}</td>
            <td>{{ Data.purchaseDate }}</td>
            <v-btn color="primary" @click="toDetail(Data.POID)">Detail</v-btn>
            </tr>
        </tbody>
        <v-card variant="tonal" >Total Amount: {{ sum }}</v-card>
        </template>
    </v-simple-table>
</template>


<script>
import router from '@/router'

export default {
    data: () => ({
        data: [],
        sum: 0,
        
    
        

    }),
    async created(){
        await this.checkUser();
        await this.order();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '1') {
                router.push("/purchaseTracking")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 
        },

         order:async function () {
            const url ='http://localhost:8000/purchaseOrder'
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.data = data
                for (var x in data) {
                    this.sum +=data[x].totalAmount   
                }
            });
        },
        
        async toDetail(POID) {
            router.push(`/purchaseOrder/${POID}`)
        },


    },
    
}
</script>