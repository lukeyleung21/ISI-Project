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
        await this.loadData();
    },
    methods: {
        loadData:async function() {

        },
    }
}

</script>