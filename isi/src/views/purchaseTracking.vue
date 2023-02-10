<template>
    <p>Purchase Tracking</p>
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
            if (this.$store.getters.userID == '0') {
                router.push("/purchaseOrder")
            } else if (this.$store.getters.userID == '') { 
                router.push("/login");
            } 
        },
    },
    
}
</script>