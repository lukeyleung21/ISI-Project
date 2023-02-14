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
        await this.loadData();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userType == '0') {
                router.push("/purchaseOrder")
            } else if (this.$store.getters.userType == '2') { 
                router.push("/login");
            } 
        },
        loadData:async function() {
            
        }
    },
    
}
</script>