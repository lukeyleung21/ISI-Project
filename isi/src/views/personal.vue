<template>
    <form>
        <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field type="password" v-model="pw" :error-messages="pwErrors" label="Password" required @input="$v.pw.$touch()" @blur="$v.pw.$touch()"></v-text-field>

        <v-btn class="mr-4" @click="login" >Login</v-btn>
        <v-btn to="/register" link>Sign Up</v-btn>
    </form>

</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email, minLength } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],

        validations: {
            email: { required, email },
            pw: { required, minLength: minLength(6) },
        },

        data: () => ({
            email: '',
            pw: '',
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
                if (!this.$v.pw.$dirty) return errors
                !this.$v.pw.minLength && errors.push('Password must be at least 6 characters long')
                !this.$v.pw.required && errors.push('Password is required.')
                return errors
            },
        },

        methods: {
            login () {
                this.$v.$touch()
            },
        },
    }
</script>