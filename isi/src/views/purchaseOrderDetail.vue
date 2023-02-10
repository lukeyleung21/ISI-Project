<template>
    <p>PODetail {{ this.POIID }}</p>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['POIID'],
    data: () => ({
        id: 3
    }),

    async created(){
        await this.loadData();
    },
    methods: {
        loadData:async function() {
            router.push({name: "purchaseOrderDetail", params: { POIID: 2 }})
            router.push(`/purchaseOrder/${id}`)
        },
    }
}

</script>