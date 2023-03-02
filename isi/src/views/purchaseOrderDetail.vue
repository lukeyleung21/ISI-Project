<template>
    <v-simple-table height="300px">
        <template v-slot:top>      
        <v-toolbar v-if="data.status == 'shipped'" v-slot:extension extension-height="180" flat><v-toolbar-title>
            <div>
                P.O. number: {{ data.POID }}<br>
                Purchase date: {{ data.purchaseDate }}<br>
                Customer name: {{ data.fName }}<br>
                Address: {{ data.address }}<br>
                Total amount: {{ data.totalAmount }}<br>    
                purchase order status: {{ data.status }}<br>
                Cancel data: {{ data.statusDate }}<br>
                Cancel by: {{ data.cancelBy }}<br><br><br>
            </div>
        </v-toolbar-title></v-toolbar>

        <v-toolbar v-else-if="data.status == 'hold'" v-slot:extension extension-height="180" flat><v-toolbar-title>
            <div>
                P.O. number: {{ data.POID }}<br>
                Purchase date: {{ data.purchaseDate }}<br>
                Customer name: {{ data.fName }}<br>
                Address: {{ data.address }}<br>
                Total amount: {{ data.totalAmount }}<br>    
                purchase order status: {{ data.status }}<br>
                Cancel data: {{ data.statusDate }}<br>
                Cancel by: {{ data.cancelBy }}<br><br><br>
            </div>
        </v-toolbar-title></v-toolbar>

        <v-toolbar v-else-if="data.status == 'cancelled'" v-slot:extension extension-height="180" flat><v-toolbar-title>
            <div>
                P.O. number: {{ data.POID }}<br>
                Purchase date: {{ data.purchaseDate }}<br>
                Customer name: {{ data.fName }}<br>
                Address: {{ data.address }}<br>
                Total amount: {{ data.totalAmount }}<br>    
                purchase order status: {{ data.status }}<br>
                Cancel data: {{ data.statusDate }}<br>
                Cancel by: {{ data.cancelBy }}<br><br><br>
            </div>
        </v-toolbar-title></v-toolbar>

        <v-toolbar v-else v-slot:extension extension-height="120" flat><v-toolbar-title>
            <div>
                P.O. number: {{ data.POID }}<br>
                Purchase date: {{ data.purchaseDate }}<br>
                Customer name: {{ data.fName }}<br>
                Address: {{ data.address }}<br>
                Total amount: {{ data.totalAmount }}<br>    
                purchase order status: {{ data.status }} <v-btn color="primary" @click="ship">ship</v-btn>
                <br><br><br>
            </div>
        </v-toolbar-title></v-toolbar>
        </template>
    </v-simple-table>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['POID'],
    data: () => ({
        data:[],
        productDetail:[],
        
    }),

    async created(){
        await this.loadData();
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            fetch('http://localhost:8000/trackingDetailUser/' + this.POID)
                .then(response => response.json())
                .then(data => {
                    for (var x in data) { this.data = data[x] }
                })

        },
        loadData:async function() {
            fetch('http://localhost:8000/purchaseOrderDetail/' + this.POID)
            .then(response => response.json())
            .then(data => {
                this.productDetail = data
            })
        },

        async ship(){
            fetch('http://localhost:8000/ship/' + this.POID)
            .then(response => {
                if (response.status == 200) {
                    window.location.reload()
                } else {
                    console.log("fail")
                }
            })
        },
    }
}
    

</script>