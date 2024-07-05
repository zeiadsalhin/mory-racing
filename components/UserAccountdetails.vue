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
const subsState = ref(false)
const apiState = ref(true)
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

        <div v-if="dataview" class="md:w-11/12 min-w-fit  px-4 m:py-10 md:p-5 text-center mx-auto"
            :class="theme.global.current.value.dark ? 'text-white bg-zinc-950' : 'text-zinc-800 bg-zinc-100'">
            <div class="back mb-5a py-5 flex justify-start">
                <v-btn to="/" :ripple="false" min-width="50" max-width="50" class="w-fit"><v-icon
                        size="30">mdi-chevron-left</v-icon></v-btn>
            </div>
            <div class="main lg:flex flex-row justify-around">
                <div class="1 md:px-10 w-fit md:w-8/12  ">
                    <div class="welcome md:flex md:justify-start md:space-x-3 md:p-2 w-fit text-center mx-auto">
                        <div class="w-1.5 h-10 bg-zinc-950 my-auto rounded-sm"></div>
                        <div class="icon p-"><v-img v-if="avatar" :src="avatar" width="60"
                                class="mx-auto rounded-full"></v-img>
                            <v-icon v-else size="40">mdi-account</v-icon>
                        </div>
                        <p class="font-semibold text-2xl md:text-left text-center p-2 my-auto">Welcome, {{ displayname
                            }} !
                        </p>
                        <v-btn readonly variant="tonal" :color="subsState ? 'green' : 'grey-darken-1'"
                            class="flex justify-center text-center align-middle items-center mx-auto my-auto w-fit">
                            {{ subsState ? 'Subscribed' : 'Free' }}</v-btn>
                    </div>

                    <div class="logout flex mt-10  w-fit text-center mx-auto"><v-btn @click="LogOut" min-height="40"
                            min-width="120" class="m-5" color="grey-darken-3"><v-icon
                                class="mx-1">mdi-exit-to-app</v-icon>Logout</v-btn>
                        <p class="my-auto">Last login: {{ signin }}</p>
                    </div>
                    <div class="bg-zinc-800 w-9/12 mx-auto h-0.5 mt-10 mb-5"></div>
                    <div class="details md:flex flex-row text-left md:px-10 px-5">
                        <div class="Accountdetails left flex-col text-left md:p-5 p-3">

                            <div class="Accountdetails flex space-x-3 py-3 mb-3">
                                <v-icon class="my-auto" size="30">mdi-account-details</v-icon>
                                <h1 class="text-2xl font-semibold my-auto">Account Details:</h1>
                            </div>
                            <!--phone input and suffix-->

                            <div class="data px-3">
                                <div class="email">
                                    <form @submit.prevent="UpdateEmail" class="w-full flex py-2 space-x-2">
                                        <label for="id" class="text-xl my-auto">Email:</label>
                                        <input :disabled="isDisablede" v-model="email"
                                            class="text-lg p-0.5 my-auto w-full"
                                            :class="isDisablede ? '' : 'outline outline-1 outline-zinc-500'"
                                            required></input>
                                    </form>
                                </div>
                                <div class="authenticationstate w-full py-2 space-x-5">
                                    <label class="text-xl">Account:</label>
                                    <label for="auth" class="text-lg my-auto">{{ auth }}</label>
                                    <template v-if="auth == 'authenticated'">
                                        <v-icon class="mb-1" size="25">mdi-check-decagram</v-icon>
                                    </template>
                                </div>
                            </div>
                        </div>

                        <v-card color="black" :elevation="6" variant="elevated"
                            class="details right min-w-fit flex-col text-left pa-5">
                            <div class="Subscriptiondetails flex space-x-3 py-3 mb-3">
                                <v-icon class="my-auto" size="30">mdi-cloud-sync</v-icon>
                                <h1 class="text-2xl font-semibold my-auto">Subscription Details:</h1>
                            </div>
                            <div class="statues px-5">
                                <p class="text-xl inline-block">Subscription Status: </p> <v-btn readonly variant="text"
                                    :color="subsState ? 'green' : 'grey-darken-1'"
                                    class="flex justify-center text-center align-middle items-center mx-auto my-auto w-fit">
                                    {{ subsState ? 'Subscribed' : 'Free' }}</v-btn>
                            </div>

                            <div v-if="subsState" class="start px-5">
                                <p class="text-xl py-2">Start Date:</p> <v-btn readonly variant="text"
                                    :color="subsState ? 'green' : 'grey-darken-1'"
                                    class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                    {{ subsState ? '2024-01-01' : 'not available' }}</v-btn>
                            </div>
                            <div v-if="subsState" class="end px-5">
                                <p class="text-xl py-2">End Date:</p>
                                <v-btn readonly variant="text" :color="subsState ? 'red-darken-4' : 'grey-darken-1'"
                                    class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                    {{ subsState ? '2024-01-01' : 'not available' }}</v-btn>
                            </div>

                            <div v-if="subsState" class="manage px-5">
                                <v-btn @click="subsState = false" type="button" max-height="40" min-height="40"
                                    variant="text" color="red" :ripple="false" :elevation="1" class="m-5a w-fit">
                                    Cancel
                                </v-btn>
                                <v-btn @click="" type="button" max-height="40" min-height="40" variant="tonal"
                                    color="green" :ripple="false" :elevation="0" class="m-5 w-fit">
                                    Renew
                                </v-btn>
                            </div>
                            <div v-else class="subscribe">
                                <v-btn @click="subsState = true" type="button" max-height="40" min-height="40"
                                    variant="outlined" color="green" :elevation="0" class="m-5 w-fit">
                                    <v-icon class="mr-1">mdi-plus-thick</v-icon> Subscribe now
                                </v-btn>
                            </div>

                        </v-card>
                    </div>
                </div>
                <div class="2 md:px-10 w-fit mx-auto my-5 md:min-w-fit">
                    <v-card class="states min-w-fit flex-col text-left pa-5">
                        <div class="title flex mb-3">
                            <v-icon class="mx-2" size="30">mdi-pulse</v-icon>
                            <h1 class="text-2xl font-semibold ">Status:</h1>
                        </div>
                        <div class="content w-fit">
                            <div class="game flex px-5">
                                <h1 class="text-xl py-2">Game Server: </h1>
                                <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                    class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                    {{ apiState ? 'Operational' : 'down' }}</v-btn>
                            </div>
                            <div class="api flex px-5">
                                <h1 class="text-xl py-2">API: </h1>
                                <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                    class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                    {{ apiState ? 'Operational' : 'down' }}</v-btn>
                            </div>
                            <div class="run flex px-5">
                                <h1 class="text-xl py-2">Game Access: </h1>
                                <v-btn readonly variant="text" :color="!apiState ? 'green-darken-1' : 'red-darken-1'"
                                    class="flex justify-center text-h6 text-center mx-auto my-auto w-fit"
                                    :prepend-icon="!apiState ? '' : 'mdi-alert'">
                                    {{ !apiState ? 'Operational' : 'down' }}</v-btn>
                            </div>

                        </div>
                    </v-card>
                </div>
                <!-- <ResetPassword /> -->
                <!-- <UserAccountOrders /> -->
                <!-- <UserAccountAddresses /> -->
            </div>
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
        </div>
    </div>
</template>