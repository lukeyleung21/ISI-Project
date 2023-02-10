<template>
    <p>ProductID: {{ this.productID }}</p>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['productID'],
    data: () => ({
        
    }),

    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {

        },
    }
}

</script>