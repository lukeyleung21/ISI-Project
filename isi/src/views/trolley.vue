<template>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Price
            </th>
            <th style="width: 10%"></th>
            <th class="text-left"  style="width: 10%">
              Quantity
            </th>
            <th style="width: 10%"></th>
            <th class="text-left">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in userData"
            :key="item.SCID"
          >
            <td @click="toDetail(item.productID)">{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td style="width: 10%"><v-btn class="mr-4" @click="plusOne(item)">+</v-btn></td>
            <td style="width: 10%">{{ item.quantity }}</td>
            <td style="width: 10%"><v-btn class="mr-4" @click="minusOne(item)">-</v-btn></td>
            <td>{{ item.quantity*item.price }}</td>
            <td><v-btn class="mr-4" @click="del(item)">delete</v-btn></td>
          </tr>
          <tr>
            <td><v-btn @click="Pushtopurchase(userData)">Confirm</v-btn></td>
          </tr>
        </tbody>
      </v-simple-table>
</template>

<script>
import router from '@/router'

export default {
    data: () => ({
        userData: [],
        amount: [],
    }),
    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '2') {
                router.push("/login")
            }
        },
        loadData: async function(){
            const url = 'http://localhost:8000/trolley/'
            fetch(url + this.$store.getters.userID)
            .then((response) => response.json())
            .then((data) => { 
                this.userData = data
            });
        },
        
        del: function(item){
            const url = 'http://localhost:8000/delitem/'
            console.log("here")
            fetch(url + this.$store.getters.userID, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ productID: item.productID})
            })
            .then((response) => {
              window.location.reload()
            })
        },

        plusOne: function(item) {
            const plus = 1;
            item.quantity = item.quantity + plus;
            const url = 'http://localhost:8000/csc/'
            fetch(url + this.$store.getters.userID, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productID: item.productID, qunantity: plus })
            })
            .then((response) => {
                if (response.status == 200) {
                }
            })

        },

        minusOne: function(item) {
            if (item.quantity == 1) {
                item.quantity=1;
            } else {
                const minus = -1;
                item.quantity = item.quantity + minus;
                const url = 'http://localhost:8000/csc/'
                fetch(url + this.$store.getters.userID, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productID: item.productID, qunantity: minus })
            })
            .then((response) => {
                if (response.status == 200) {
                }
            })
            }
        },
        toDetail(x){
          router.push(`/product/${x}`)
        },
        
        Pushtopurchase: function(item) {
          const amount =[];
          for (let i = 0; i < item.length; i++) {
            amount[i] = item[i].quantity*item[i].price;

          }
          const total_amount = amount.reduce(function(a,b){return a+b;}, 0);
          const url = 'http://localhost:8000/pushtopurchase/'
          fetch(url + this.$store.getters.userID, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ total_amount: total_amount})
          })
          .then((response) => {
              if (response.status == 200) {
              const url1 = 'http://localhost:8000/deleteShoppingcart/'
                fetch(url1 + this.$store.getters.userID, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }})
                .then((response) => {
                  if (response.status == 200) {
                    window.location.reload()
                  }
                })
              }
          })
        }

    }
}

</script>
