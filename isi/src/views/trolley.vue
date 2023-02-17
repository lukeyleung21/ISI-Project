    <template>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">
              ProductID
            </th>
            <th class="text-left">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in userData"
            :key="item.SCID"
          >
            <td>{{ item.productID }}</td>
            <td>{{ item.quantity }}</td>
          </tr>
        </tbody>
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
    }
}

</script>