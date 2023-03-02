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
            Purchase order status: {{ data.status }}<br>
            <v-btn v-if="data.status != 'shipped'" color="error" @click="cancel">Cancel the Order</v-btn>
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
        data: [],
        productDetail: [],
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
            } else {
                fetch('http://localhost:8000/trackingDetailUser/' + this.POID)
                .then(response => response.json())
                .then(data => {
                    if (data[0].userID != this.$store.getters.userID) {
                        router.push("/purchaseTracking")
                    }
                    for (var x in data) { this.data = data[x] }
                })
            }
        },
        loadData:async function() {
            fetch('http://localhost:8000/trackingDetail/' + this.POID)
            .then(response => response.json())
            .then(data => {
                this.productDetail = data
            })
        },
        async cancel(){
            fetch('http://localhost:8000/cancel/' + this.POID)
            .then(response => {
                if (response.status == 200) {
                    window.location.reload()
                } else {
                    console.log("fail")
                }
            })
        },
    },
}

</script>