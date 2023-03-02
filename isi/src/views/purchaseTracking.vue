<template>
    <v-simple-table height="auto">
            <template v-slot:top v-if="this.type == 0"><v-toolbar flat><v-toolbar-title>
                <v-btn color="primary" @click="changeToAll()">All</v-btn>&nbsp;
                <v-btn outlined @click="changeToCurrent()">Current</v-btn>&nbsp;
                <v-btn outlined @click="changeToPast()">Past</v-btn>
            </v-toolbar-title></v-toolbar></template>
            <template v-slot:top v-else-if="this.type == 1"><v-toolbar flat><v-toolbar-title>
                <v-btn outlined @click="changeToAll()">All</v-btn>&nbsp;
                <v-btn color="primary" @click="changeToCurrent()">Current</v-btn>&nbsp;
                <v-btn outlined @click="changeToPast()">Past</v-btn>
            </v-toolbar-title></v-toolbar></template>
            <template v-slot:top v-else-if="this.type == 2"><v-toolbar flat><v-toolbar-title>
                <v-btn outlined @click="changeToAll()">All</v-btn>&nbsp;
                <v-btn outlined @click="changeToCurrent()">Current</v-btn>&nbsp;
                <v-btn color="primary" @click="changeToPast()">Past</v-btn>
            </v-toolbar-title></v-toolbar></template>

            <template v-slot:default>
            <thead>
            <tr>
            <th class="text-left" width="5%">P.O. Number</th>
            <th class="text-left" width="10%"></th>
            <th class="text-left" width="25%">Purchase Date</th>
            <th class="text-left" width="25%">Total Order Amount</th>
            <th class="text-left" width="25%">Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in order" :key="order.POID">
            <td>{{ order.POID }}</td>
            <td><v-btn color="primary" @click="toDetail(order.POID)">Detail</v-btn></td>
            <td>{{ order.purchaseDate }}</td>
            <td>{{ order.totalAmount }}</td>
            <td>{{ order.status }}</td>
            </tr>
            </tbody>
            </template>
    </v-simple-table>
    
</template>

<script>
import router from '@/router'

export default {
    data: () => ({
        order: [],
        allOrder: [],
        currentOrder: [],
        pastOrder: [],
        type: 0,
    }),
    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '0') {
                router.push("/purchaseOrder")
            } else if (this.$store.getters.userType == '2') { 
                router.push("/login");
            }
        },
        loadData:async function() {
            fetch('http://localhost:8000/tracking/' + this.$store.getters.userID)
            .then(response => response.json())
            .then(data => {
                this.order = data
                this.allOrder = data
                for (var x in data) {
                    if (data[x].status == 'pending' || data[x].status == 'hold') {
                        this.currentOrder.push(data[x])
                    } else if (data[x].status == 'shipped' || data[x].status == 'cancelled') {
                        this.pastOrder.push(data[x])
                    }
                }
            })
        },
        async toDetail(POID) {
            router.push(`/purchaseTrackingDetail/${POID}`)
        },
        changeToAll() {
            this.type = 0
            this.order = this.allOrder
        },
        changeToCurrent() {
            this.type = 1
            this.order = this.currentOrder
        },
        changeToPast() {
            this.type = 2
            this.order = this.pastOrder
        },
    },

    
}
</script>