<template>
    <v-simple-table v-if="this.$store.getters.userType == '0'" height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">Full Name</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Vendor</td>
        </tr>
        
        </tbody>
        <p></p>
        <v-btn class="mr-4" @click="logout">Logout</v-btn>
        </template>
    </v-simple-table>
    <v-simple-table v-else height="300px">
        <template v-slot:default>
        <thead>
        <tr>
        <th class="text-left">Full Name</th>
        <th class="text-left">Email</th>
        <th class="text-left">Address</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{{ userData.fName }}</td>
            <td>{{ userData.email }}</td>
            <td>{{ userData.address }}</td>
        </tr>
        
        </tbody>
        <p></p>
        <v-btn class="mr-4" to="changePassword" link>Change password</v-btn>
        <v-btn class="mr-4" @click="logout">Logout</v-btn>
        </template>
    </v-simple-table>

</template>

<script>
import router from '@/router'

export default {
    data: () => ({
        userData: [],
    }),
    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '2') { 
                router.push("/login");
            } 
        },
        loadData:async function() {
            const url = 'http://localhost:8000/user/'
            fetch(url + this.$store.getters.userID)
            .then((response) => response.json())
            .then((data) => { 
                for (let x in data) { this.userData = data[x] }
            });
        },
        async logout () {
            this.$store.commit('logout')
        }
    },
    
}
</script>