<template>
    <v-simple-table height="auto">
         <template v-slot:default>
          <thead>
             <tr>
              <v-btn outlined @click="changeToAll()">All</v-btn>&nbsp;
              <v-btn outlined @click="changeToPending()">pending</v-btn>&nbsp;
              <v-btn outlined @click="changeToHold()">hold</v-btn>&nbsp;
              <v-btn outlined @click="changeToPast()">Past</v-btn>&nbsp;
              <v-text-field label="Search" id="serach"  data-search  @input="changeToPOid()"></v-text-field>
            </tr>
          <tr>
          <th class="text-left">Staus</th>
          <th class="text-left">P.O numbers</th>
          <th class="text-left">Name</th>
          <th class="text-left">Amount</th>
          <th class="text-left">Purchase Dates</th>
          <th class="text-left">Operation</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="Data in data" :key="Data.POID">
            <td>{{ Data.status }}</td>
            <td>{{ Data.POID }}</td>
            <td>{{ Data.fName }}</td>
            <td>{{ Data.totalAmount }}</td>
            <td>{{ Data.purchaseDate }}</td>
            <v-btn color="primary" @click="toDetail(Data.POID)">Detail</v-btn>
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
        alldata:[],
        pending:[],
        hold:[],
        ship_cancel:[],
        po_order:[],
    }),
    async created(){
        await this.checkUser();
        await this.order();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '1') {
                router.push("/purchaseTracking")
            } else if (this.$store.getters.userType == '2') { 
                router.push("/login");
            }
        },
        


         order:async function () {
            const url ='http://localhost:8000/purchaseOrder'
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.data = data
                this.alldata = data
                for (var x in data) {
                    if (data[x].status == 'pending') {
                        this.pending.push(data[x])
                    } 
                }
                for (var x in data) {
                    if (data[x].status == 'hold') {
                        this.hold.push(data[x])
                    }
                }
                for (var x in data) {
                    if (data[x].status == 'shipped' || data[x].status == 'cancelled') {
                        this.ship_cancel.push(data[x])
                    }
                     
                }
                    const searchInput = document.querySelector("[data-search]")
                    searchInput.addEventListener("input", e => {
                    const value = e.target.value
                    if (value == '') {
                        this.data = this.alldata
                    } else {
                        this.po_order=[]
                        for (var x in data) {
                            if (value == data[x].POID) {
                                this.po_order.push(data[x])
                            }
                            this.data = this.po_order
                        }
                    }
                    
                    });
            });
        },
        async toDetail(POID) {
            router.push(`/purchaseOrder/${POID}`)
        },
        changeToAll() {
            this.data = this.alldata
        },
        changeToPending() {
            this.data=this.pending
        },
        changeToHold() {
            this.data=this.hold
        },
        changeToPast() {
            this.data=this.ship_cancel
        },
        changeToPOid() {
            this.data=this.po_order
        },
    },
    
    
}
</script>