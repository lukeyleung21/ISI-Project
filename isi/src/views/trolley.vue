<template>
<p>Trolley</p>
</template>

<script>
import router from '@/router'

export default {

    async created(){
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userID == '0') { 
                router.push("/shop");
            } else if (this.$store.getters.userID == '') {
                router.push("/login")
            }
        },
    }
}

</script>