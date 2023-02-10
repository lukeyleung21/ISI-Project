<template>
    <p>PODetail {{ this.POIID }}</p>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['POIID'],
    data: () => ({

    }),

    async created(){
        await this.checkUser();
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userID == '0') {
                router.push("/purchaseOrder")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 

            // fetch data to get the userID of the order to check which user is opening this page
            const url = `` //here need the api url
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (this.$store.getters.userID != data.userID) {
                    router.push("/purchaseTracking")
                }
            })
        },
        loadData:async function() {

        }
    },
}

</script>