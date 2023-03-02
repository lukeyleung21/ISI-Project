<template>
<v-card class="mx-auto" max-width="auto" variant="outlined">
      <v-card-item>
        <div>
          <div class="text-h6 mb-1" v-if="data.status == 'cancelled'">
            P.O. number: {{ data.POID }}<br>
            Purchase date: {{ data.purchaseDate }}<br>
            Customer name: {{ data.fName }}<br>
            Address: {{ data.address }}<br>
            Total amount: {{ data.totalAmount }}<br>    
            Purchase order status: {{ data.status }}<br>
            Cancel data: {{ data.statusDate }}<br>
            Cancel by: {{ data.cancelBy }}
          </div>

          <div class="text-h6 mb-1" v-else-if="data.status == 'shipped'">
            P.O. number: {{ data.POID }}<br>
            Purchase date: {{ data.purchaseDate }}<br>
            Customer name: {{ data.fName }}<br>
            Address: {{ data.address }}<br>
            Total amount: {{ data.totalAmount }}<br>    
            Purchase order status: {{ data.status }}<br>
            Shipment data: {{ data.statusDate }}<br>
          </div>

          <div class="text-h6 mb-1" v-else>
            P.O. number: {{ data.POID }}<br>
            Purchase date: {{ data.purchaseDate }}<br>
            Customer name: {{ data.fName }}<br>
            Address: {{ data.address }}<br>
            Total amount: {{ data.totalAmount }}<br>    
            Purchase order status: {{ data.status }} <v-btn color="primary" @click="ship">ship</v-btn>
          </div>

        </div>
      </v-card-item>

      
    </v-card>


    
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