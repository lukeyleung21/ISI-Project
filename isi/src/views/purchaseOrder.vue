<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">State</th>
        <th class="text-left">POID</th>
        <th class="text-left">Name</th>
        <th class="text-left">Total Amount</th>
        <th class="text-left">Purchase Date</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="Data in data" :key="Data.status">
            <td>{{ Data.status }}</td>
            <td>{{ Data.POID }}</td>
            <td>{{ Data.fName }}</td>
            <td>{{ Data.totalAmount }}</td>
            <td>{{ Data.purchaseDate }}</td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import router from '@/router'

export default {
    data: () => ({
        data: [],

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

            });
        },    
    },
    
}
</script>