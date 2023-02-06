<template>
  <v-app id="inspire">
    <v-navigation-drawer
        permanent
        v-model="drawer"
        app
        mini-variant
        expand-on-hover
      >
        <v-list>
          <v-list-item to="personal" link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                <p v-if="login == 1">Username</p>
                <p v-else>Login | Sign up</p>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item to="shop" link >
            <v-list-item-icon>
              <v-icon color="green lighten-1" size="30px">mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shopping Area</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="login == 1" to="trolley" link>
            <v-list-item-icon>
              <v-icon color="amber accent-2" size="30px">mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Trolly</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="login == 0" to="personal" link>
            <v-list-item-icon>
              <v-icon color="amber accent-2" size="30px">mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Trolly</v-list-item-title>
          </v-list-item>
          
        </v-list>
      </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    //
    data() {
      return { login: 0 }
    }
  }
</script>