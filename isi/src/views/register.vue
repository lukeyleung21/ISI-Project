<template>
    <form>
        <v-text-field v-model="fName" :error-messages="fNameErrors" label="Full name" required :counter="255" @input="$v.fName.$touch()" @blur="$v.fName.$touch()"></v-text-field>
        <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field type="password" v-model="password" :error-messages="pwErrors" label="Password" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
        <v-text-field type="password" v-model="cpw" :error-messages="cpwErrors" label="Password (Again)" required @input="$v.cpw.$touch()" @blur="$v.cpw.$touch()"></v-text-field>
        <v-text-field v-model="address" :error-messages="addressErrors" label="Address" required :counter="255" @input="$v.address.$touch()" @blur="$v.address.$touch()"></v-text-field>

        <p v-if="emailRepeat == true" style="color:red">The email is repeated, please user another one.</p>
        <v-btn class="mr-4" @click="register">Register</v-btn>
    </form>

</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength, sameAs } from 'vuelidate/lib/validators'
import router from '@/router'

export default {
    mixins: [validationMixin],

    validations: {
        fName: { required, maxLength: maxLength(255) },
        email: { required, email },
        password: { required, minLength: minLength(6),
            containsDigital: function(value) {
                return /[0-9]/.test(value)
            },
            containsUpperCase: function(value) {
                return /[A-Z]/.test(value)
            },
            },
        cpw: { required, sameAsPassword: sameAs('password') },
        address: { required, maxLength: maxLength(255) },

    },

    data: () => ({
        fName: '',
        email: '',
        password: '',
        cpw: '',
        address: '',
        emailRepeat: false,
    }),

    computed: {
        fNameErrors () {
            const errors = []
            if (!this.$v.fName.$dirty) return errors
            !this.$v.fName.required && errors.push('Full name is required.')
            return errors
        },
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
            !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
            !this.$v.password.containsDigital && errors.push('Password must contain one digital number')
            !this.$v.password.containsUpperCase && errors.push('Password must contain one capital letter')
            !this.$v.password.required && errors.push('Password is required.')
            return errors
        },
        cpwErrors () {
            const errors = []
            if (!this.$v.cpw.$dirty) return errors
            !this.$v.cpw.sameAsPassword && errors.push('Two passwords didn\'t match')
            return errors
        },
        addressErrors () {
            const errors = []
            if (!this.$v.address.$dirty) return errors
            !this.$v.address.required && errors.push('Address is required.')
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
        async register () {
            this.$v.$touch()
            
            fetch('http://localhost:8000/user')
            .then((response) => response.json())
            .then((data) => {
                for (var x in data) {
                    if (data[x].email == this.email) {
                        this.emailRepeat = true;
                        break;
                    }
                }

                if (!this.$v.$invalid && this.emailRepeat == false) {
                    fetch('http://localhost:8000/register/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({fName: this.fName, email: this.email, password: this.password, address: this.address})
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        sessionStorage.setItem("user", JSON.stringify(data))
                        this.$store.commit('login')
                    });
                }

            }) 
            
        },  
    },
    
}
</script>