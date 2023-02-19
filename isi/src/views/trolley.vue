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
            if (this.$store.getters.userType == '0') { 
                router.push("/");
            } else if (this.$store.getters.userType == '2') {
                router.push("/login")
            }
        },
    }
}

</script>