<template>
    <form>
        <h1>Enter the password to login the vendor account.</h1>

        <v-text-field type="password" v-model="password" :error-messages="pwErrors" label="Password" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

        <p v-if="fail == true" style="color:red">The password is wrong.</p>

        <v-btn class="mr-4" @click="login" >Login</v-btn>
    </form>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, minLength } from 'vuelidate/lib/validators'
    import router from '@/router'

    export default {
        mixins: [validationMixin],

        validations: {
            password: { required, },
        },

        data: () => ({
            password: '',
            fail: false,
        }),

        computed: {
            pwErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required.')
                return errors
            },
        },
        async created(){
            await this.checkUser();
        },
        methods: {
            checkUser:async function() {
                if (this.$store.getters.userID != '') { 
                    router.push("/personal");
                } 
            },
            login () {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    const url = 'http://localhost:8000/user/0'
                    fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data[0].password == this.password) {
                            sessionStorage.setItem("user", JSON.stringify({ userID: '0', fName: 'Vendor' }))
                            this.$store.commit('login')
                        } else {
                            this.fail = true
                        }
                    })
                }

            },
        },
    }
</script>