<template>
    <p>PODetail {{ this.POID }}</p>
</template>
    
<script>
import router from '@/router'

export default {
    props: ['POID'],
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