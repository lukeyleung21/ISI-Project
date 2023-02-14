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
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            
        },
        loadData:async function() {

        },
    }
}

</script>