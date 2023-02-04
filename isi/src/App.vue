<template>
  <v-app id="inspire">
    <v-navigation-drawer
        permanent
        v-model="drawer"
        app
        expand-on-hover
      >
        <v-list>
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Username Here
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          nav
          dense
        >
          <v-list-item link >
            <v-list-item-icon>
              <v-icon color="green lighten-1" size="30px">mdi-shopping</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Shopping Area</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="amber accent-2" size="30px">mdi-cart</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Trolly</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon color="blue-grey lighten-3" size="30px">mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Favourite</v-list-item-title>
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
  }
</script>