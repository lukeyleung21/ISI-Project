<template>
  <v-app id="inspire">
    <v-navigation-drawer permanent v-model="drawer" app mini-variant expand-on-hover>

      <!-- Vendor / User / Visitor -->
      <v-list v-if="this.$store.getters.userID == '0'">
          <v-list-item to="/personal" link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <p>Vendor</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list v-else-if="this.$store.getters.userID != ''">
          <v-list-item to="/personal" link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <p>{{ this.$store.getters.fName }}</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list v-else>
          <v-list-item to="/login" link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <p>Login | Sign up</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item to="/" link>
            <v-list-item-icon><v-icon color="green lighten-1" size="30px">mdi-shopping</v-icon></v-list-item-icon>
            <v-list-item-title>Shopping Area</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="this.$store.getters.userID != '' && this.$store.getters.userID != '0'" to="/trolley" link>
            <v-list-item-icon><v-icon color="amber accent-2" size="30px">mdi-cart</v-icon></v-list-item-icon>
            <v-list-item-title>Trolly</v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="this.$store.getters.userID == ''" to="/login" link>
            <v-list-item-icon><v-icon color="amber accent-2" size="30px">mdi-cart</v-icon></v-list-item-icon>
            <v-list-item-title>Trolly</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="this.$store.getters.userID == '0'" to="/purchaseOrder" link>
            <v-list-item-icon><v-icon color="amber accent-2" size="30px">mdi-newspaper-variant-outline</v-icon></v-list-item-icon>
            <v-list-item-title>Purchase Order</v-list-item-title>
          </v-list-item>
          <v-list-item v-else-if="this.$store.getters.userID != ''" to="/purchaseTracking" link>
            <v-list-item-icon><v-icon color="amber accent-2" size="30px">mdi-newspaper-variant-outline</v-icon></v-list-item-icon>
            <v-list-item-title>Purchase Tracking</v-list-item-title>
          </v-list-item>
  
          
        </v-list>
      </v-navigation-drawer>

    <v-main><router-view></router-view></v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '@/router'

  export default {
    //
    data() {
      return { 
      }
    },
    computed: {
      ...mapGetters(["userID"]),
      ...mapGetters(["fName"])
    },
    methods: {
      
    },
  }
</script>