<template>
    <p>Purchase Order</p>
</template>

<script>
import router from '@/router'

export default {
    data: () => ({

    }),
    async created(){
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '1') {
                router.push("/purchaseTracking")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 
        },
    },
    
}
</script>