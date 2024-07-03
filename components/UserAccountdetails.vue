<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme();
import axios from 'axios';
import { useMainStore } from '@/store';
const mainStore = useMainStore();
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const dataview = ref()
const avatar = ref()
const displayname = ref()
const email = ref()
const isDisablede = ref(true);
const signin = ref()
const auth = ref()
onMounted(() => {
    FetchUserData()
})
//fetch user data
async function FetchUserData() {
    try {
        const { data, error } = await supabase.auth.getSession(); // get session status from local cookies
        // console.log(data.session.user);
        // if (data.session.user.user_metadata.role == 'admin') {  // Only access to regular users
        // navigateTo("/admin")
        // console.log('this user is admin')
        // } else {
        dataview.value = true
        avatar.value = data.session.user.identities[0].identity_data.avatar_url
        displayname.value = data.session.user.identities[0].identity_data?.first_name ? data.session.user.identities[0].identity_data.first_name : data.session.user.identities[0].identity_data.full_name // Display registered username
        // phone.value = data.session.user.phone// Display registered id
        email.value = data.session.user.email // Display registered email 
        const date = new Date(data.session.user.last_sign_in_at).toLocaleString('en-us')// last login
        signin.value = date
        auth.value = data.session.user.role // Display account status
        // console.log('user phone: ', data.session.user)
        // }
    } catch (error) {
        console.log(error);
    }
}
async function LogOut() {
    try {
        const { error } = await supabase.auth.signOut()
        // Swal.fire({
        //     title: 'Success',
        //     icon: 'success',
        //     text: 'You Signed out successfully',
        //     toast: true,
        //     timer: 1000,
        //     showConfirmButton: false,
        // }).then(() => {
        navigateTo("/login")
        // clear cart
        mainStore.clearCart();
        // })
    } catch (error) {
        console.log(error)
    }
}
</script>
<template>
    <div>
        <div v-if="dataview" class="mt- md:w-11/12  px-4 py-10 md:p-5 text-centera mx-auto"
            :class="theme.global.current.value.dark ? 'text-white bg-zinc-950' : 'text-zinc-800 bg-zinc-100'">
            <div class="welcome flex justify-start space-x-3 md:p-2">
                <div class="w-1.5 h-10 bg-zinc-950 rounded-sm"></div>
                <div class="icon p-"><v-img v-if="avatar" :src="avatar" width="40" class="mx-auto rounded-full"></v-img>
                    <v-icon v-else size="40">mdi-account</v-icon>
                </div>
                <p class="font-semibold text-2xl text-left my-auto">Welcome, {{ displayname }}</p>
            </div>

            <div class="logout flex mt-10"><v-btn @click="LogOut" min-height="40" min-width="120" class="m-5"
                    color="grey-darken-3"><v-icon class="mx-1">mdi-exit-to-app</v-icon>Logout</v-btn>
                <p class="my-auto">Last login: {{ signin }}</p>
            </div>
            <div class="bg-zinc-800 w-1/3 ml-3 h-0.5 mt-10 mb-5"></div>
            <div class="details flex-col text-left md:px-10 px-5">
                <div class="Accountdetails flex space-x-3 py-2 mb-3">
                    <div class="w-1 h-10 bg-zinc-800 rounded-sm"></div>
                    <h1 class="text-2xl font-semibold my-auto">Account Details:</h1>
                </div>
                <!--phone input and suffix-->


                <div class="email">
                    <form @submit.prevent="UpdateEmail" class="w-full flex py-2 space-x-2">
                        <label for="id" class="text-xl my-auto">Email:</label>
                        <input :disabled="isDisablede" v-model="email" class="text-lg p-0.5 my-auto w-full"
                            :class="isDisablede ? '' : 'outline outline-1 outline-zinc-500'" required></input>
                        <!-- <v-btn v-if="isDisablede" @click="isDisablede = false" max-height="30" class="w-4"
                            variant="tonal"><v-icon>{{
                                isDisablede ?
                                    'mdi-pencil' : '' }}</v-icon></v-btn>
                        <div v-else class="cancelandupdatebutton">
                            <v-btn @click="UpdatePhone" max-height="30" max-width="10" variant="tonal"
                                class="m-1"><v-icon>{{
                                    isDisablede ?
                                        '' : 'mdi-content-save' }}</v-icon>
                            </v-btn>
                            <v-btn @click="isDisablede = true" max-height="30" max-width="10" variant="tonal"
                                class="mx-1"><v-icon>{{
                                    isDisablede ?
                                        '' : 'mdi-close' }}</v-icon>
                            </v-btn>
                        </div> -->
                    </form>
                </div>
                <div class="authenticationstate w-full py-2 space-x-5">
                    <label class="text-xl">Account:</label>
                    <label for="auth" class="text-lg my-auto">{{ auth }}</label>
                    <template v-if="auth == 'authenticated'">
                        <v-icon class="mb-1" size="25">mdi-check-decagram</v-icon>
                    </template>
                </div>
                <div class="Accountdetails flex space-x-3 py-2 mb-3 mt-5">
                    <div class="w-1 h-10 bg-zinc-800 rounded-sm"></div>
                    <h1 class="text-2xl font-semibold my-auto">Subscription Details:</h1>
                </div>
                <p class="text-xl">Subscription Status:</p>
                <p class="text-xl py-2">Subscription Start:</p>
                <p class="text-xl py-">Subscription End:</p>

                <v-btn @click="" type="button" max-height="40" min-height="40" variant="text" color="red"
                    :ripple="false" :elevation="1" class="m-5a w-fit">
                    Cancel
                </v-btn>
                <v-btn @click="" type="button" max-height="40" min-height="40" variant="tonal" color="green"
                    :ripple="false" :elevation="0" class="m-5 w-fit">
                    Renew
                </v-btn>
            </div>
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
            <!-- <ResetPassword /> -->
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
            <!-- <UserAccountOrders /> -->
            <!-- <UserAccountAddresses /> -->
        </div>
    </div>
</template>