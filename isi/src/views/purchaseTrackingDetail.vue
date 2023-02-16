<template>
    <p>PODetail {{ this.POID }}</p>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['POID', 'userID'],
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
            } else if (this.userID != this.$store.getters.userID) {
                router.push("/purchaseTracking")
            }
        },
        loadData:async function() {
            
        }
    },
}

</script>