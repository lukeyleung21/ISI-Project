<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">Status</th>
        <th class="text-left">Quantity</th>
        <th class="text-left">Total Amount</th>
        <th class="text-left">Date</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="Data in data" :key="Data.status">
            <td>{{ Data.status }}</td>
            <td> test </td>
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
            if (this.$store.getters.userID != '' && this.$store.getters.userID != '0') {
                router.push("/purchaseTracking")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 
        },
        
        order:async function () {
            const url ='http://localhost:8000/purchaseOrder/'
            fetch(url)
            .then((response) => response.json())
            .then(data => {
                this.data = data
            })
            }
            
    }

            
};

    

</script>