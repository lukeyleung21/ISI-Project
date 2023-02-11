<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">State</th>
        <th class="text-left">Full Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Address</th>
        <th class="text-left">Quantity</th>
        <th class="text-left">Total Amount</th>
        <th class="text-left">Date</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="userdata in userdata" :key="userdata">
            <td>{{ userdata.fName }}</td>
            <td>{{ userdata.email }}</td>
            <td>{{ userdata.address }}</td>
            <td>{{ userdata.fName }}</td>
            <td>{{ userdata.email }}</td>
            <td>{{ userdata.address }}</td>
            <td>{{ userdata.address }}</td>
            </tr>
       
        </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import router from '@/router'

export default {
    data: () => ({

    }),
    async created(){
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userID != '' && this.$store.getters.userID != '0') {
                router.push("/purchaseTracking")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 
        },

        async orderlist () {
            fetch('http://localhost:8000/order', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({fName: this.fName, email: this.email, password: this.password, address: this.address})
            })
            .then((response) => response.json())
            .then((data) => {

            });
        },

        async created(){
        await this.loadData();
        },
       
    },
    
}
</script>