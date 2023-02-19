<template>
    <form>
        <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field type="password" v-model="password" :error-messages="pwErrors" label="Password" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>

        <p v-if="fail == true" style="color:red">Email or password is wrong.</p>

        <v-btn class="mr-4" @click="login" >Login</v-btn>
        <v-btn to="/register" link>Sign Up</v-btn>
        <p></p>
        <p>If you are vendor, please click the below button to login.</p>
        <v-btn to="/vlogin" link>Vendor login</v-btn>

    </form>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'
    import router from '@/router'

    export default {
        mixins: [validationMixin],

        validations: {
            email: { required, email },
            password: { required, },
        },

        data: () => ({
            email: '',
            password: '',
            fail: false,
        }),

        computed: {
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('Must be valid e-mail')
                !this.$v.email.required && errors.push('E-mail is required')
                return errors
            },
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
                if (this.$store.getters.userType != '2') { 
                    router.push("/personal");
                } 
            },
            login () {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    const url = 'http://localhost:8000/checkPw/'
                    fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: this.email, password: this.password })
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data == '') { 
                            this.fail = true; 
                            return;
                        }
                        sessionStorage.setItem("user", JSON.stringify({ userID: data.userID, fName: data.fName }))
                        this.$store.commit('login')
                    })
                }
            },
        },
    }
</script>