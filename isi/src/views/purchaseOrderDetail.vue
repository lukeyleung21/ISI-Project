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

          <div class="text-h6 mb-1" v-else-if="data.status == 'pending'">
            P.O. number: {{ data.POID }}<br>
            Purchase date: {{ data.purchaseDate }}<br>
            Customer name: {{ data.fName }}<br>
            Address: {{ data.address }}<br>
            Total amount: {{ data.totalAmount }}<br>    
            Purchase order status: {{ data.status }} <v-btn color="primary" @click="hold">Hold</v-btn> <v-btn color="primary" @click="ship">ship</v-btn> <v-btn color="error" @click="vcancel">Cancel</v-btn>
          </div>

          <div class="text-h6 mb-1" v-else-if="data.status == 'hold'">
            P.O. number: {{ data.POID }}<br>
            Purchase date: {{ data.purchaseDate }}<br>
            Customer name: {{ data.fName }}<br>
            Address: {{ data.address }}<br>
            Total amount: {{ data.totalAmount }}<br>    
            Purchase order status: {{ data.status }}<v-btn color="primary" @click="ship">ship</v-btn> <v-btn color="error" @click="vcancel">Cancel</v-btn>
          </div>
        </div>
      </v-card-item>

      <v-card-text>
        <v-simple-table height="auto"><template v-slot:default><thead>
        <tr>
            <th class="text-left">Product name</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">Price</th>
            <th class="text-left">Subtotal</th>
        </tr></thead><tbody>
        <tr v-for="product in productDetail" :key="product.name">
            <td>{{ product.name }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.amount }}</td>
        </tr></tbody></template>
        </v-simple-table> 
      </v-card-text>
  
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
            fetch('http://localhost:8000/trackingDetail/' + this.POID)
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

        async hold(){
            fetch('http://localhost:8000/hold/' + this.POID)
            .then(response => {
                if (response.status == 200) {
                    window.location.reload()
                } else {
                    console.log("fail")
                }
            })
        },

        async vcancel(){
            fetch('http://localhost:8000/vcancel/' + this.POID)
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