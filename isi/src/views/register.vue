<template>
    <form>
        <v-text-field v-model="fName" :error-messages="fNameErrors" label="Full name" required :counter="255" @input="$v.fName.$touch()" @blur="$v.fName.$touch()"></v-text-field>
        <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field type="password" v-model="pw" :error-messages="pwErrors" label="Password" required @input="$v.pw.$touch()" @blur="$v.pw.$touch()"></v-text-field>
        <v-text-field type="password" v-model="cpw" :error-messages="cpwErrors" label="Password (Again)" required @input="$v.cpw.$touch()" @blur="$v.cpw.$touch()"></v-text-field>
        <v-text-field v-model="address" :error-messages="addressErrors" label="Address" required :counter="255" @input="$v.address.$touch()" @blur="$v.address.$touch()"></v-text-field>

        <v-btn class="mr-4" @click="register">Register</v-btn>
    </form>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email, minLength, sameAs } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            fName: { required, maxLength: maxLength(255) },
            email: { required, email },
            pw: { required, minLength: minLength(6), 
                containsDigital: function(value) {
                    return /[0-9]/.test(value)
                },
                containsUpperCase: function(value) {
                    return /[A-Z]/.test(value)
                },
                },
            cpw: { required, sameAsPassword: sameAs('pw') },
            address: { required, maxLength: maxLength(255) },

        },

        data: () => ({
            fName: '',
            email: '',
            pw: '',
            cpw: '',
            address: '',
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
                if (!this.$v.pw.$dirty) return errors
                !this.$v.pw.minLength && errors.push('Password must be at least 6 characters long')
                !this.$v.pw.containsDigital && errors.push('Password must contain one digital number')
                !this.$v.pw.containsUpperCase && errors.push('Password must contain one capital letter')
                !this.$v.pw.required && errors.push('Password is required.')
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

        methods: {
            async register () {
                this.$v.$touch()
                if (!this.$v.$invalid) {
                    console.log("ok")
                }
                
            },
        },
    }
</script>