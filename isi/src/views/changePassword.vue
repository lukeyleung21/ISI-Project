<template>
    <form>
        <v-text-field type="password" v-model="oldPassword" :error-messages="opwErrors" label="Old Password" required @input="$v.oldPassword.$touch()" @blur="$v.oldPassword.$touch()"></v-text-field>
        <v-text-field type="password" v-model="newPassword" :error-messages="npwErrors" label="New Password" required @input="$v.newPassword.$touch()" @blur="$v.newPassword.$touch()"></v-text-field>
        <v-text-field type="password" v-model="cnpw" :error-messages="cnpwErrors" label="New Password (Again)" required @input="$v.cnpw.$touch()" @blur="$v.cnpw.$touch()"></v-text-field>

        <p v-if="fail == true" style="color:red">The old password is wrong.</p>
        <p v-if="success == true" style="color:green">The password has changed.</p>
        <v-btn class="mr-4" @click="changePassword">Change</v-btn>
        
    </form>
 
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, minLength, sameAs } from 'vuelidate/lib/validators'
import router from '@/router'

export default {
    mixins: [validationMixin],

    validations: {
        oldPassword: { required, },
        newPassword: { required, minLength: minLength(6),
            containsDigital: function(value) {
                return /[0-9]/.test(value)
            },
            containsUpperCase: function(value) {
                return /[A-Z]/.test(value)
            },
            },
        cnpw: { required, sameAsPassword: sameAs('newPassword') },

    },

    data: () => ({
        oldPassword: '',
        newPassword: '',
        cnpw: '',
        fail: false,
        success: false,
    }),
    computed: {
        opwErrors () {
            const errors = []
            if (!this.$v.oldPassword.$dirty) return errors
            !this.$v.oldPassword.required && errors.push('Password is required.')
            return errors
        },
        npwErrors () {
            const errors = []
            if (!this.$v.newPassword.$dirty) return errors
            !this.$v.newPassword.minLength && errors.push('Password must be at least 6 characters long')
            !this.$v.newPassword.containsDigital && errors.push('Password must contain one digital number')
            !this.$v.newPassword.containsUpperCase && errors.push('Password must contain one capital letter')
            !this.$v.newPassword.required && errors.push('Password is required.')
            return errors
        },
        cnpwErrors () {
            const errors = []
            if (!this.$v.cnpw.$dirty) return errors
            !this.$v.cnpw.sameAsPassword && errors.push('Two passwords didn\'t match')
            return errors
        },
    },
    async created(){
        await this.checkUser();
    },
    methods: {
        checkUser:async function() {
            if (this.$store.getters.userID == '') { 
                router.push("/login");
            } else if (this.$store.getters.userID == '0') {
                router.push("/shop");
            }
        },
        async changePassword () {
            this.$v.$touch()

            const url1 = 'http://localhost:8000/user/'
                fetch(url1 + this.$store.getters.userID)
                .then((response) => response.json())
                .then((data) => { 
                    if (data[0].password == this.oldPassword) {
                        const url2 = 'http://localhost:8000/cpw/'
                        fetch(url2 + this.$store.getters.userID, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ newPassword: this.newPassword })
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data)
                            this.success = true
                            this.$v.$reset()
                            this.oldPassword = ''
                            this.newPassword = ''
                            this.cnpw = ''
                            this.fail = false
                        })
                    } else {
                        this.fail = true
                    }
                });
        },  
    },
    
}
</script>