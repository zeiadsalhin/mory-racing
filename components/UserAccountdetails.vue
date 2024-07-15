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
const subsState = ref(null);
const subsStateLoad = ref(true)
const apiState = ref(true)
onMounted(() => {
    FetchUserData()
    fetchUserSubs()
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

// fetch subscriptions
const subsPeroid = ref();
const subscriptionStart = ref('');
const subscriptionEnd = ref('');
async function fetchUserSubs() {
    const user = useSupabaseUser();
    const UserId = user.value.id
    try {
        const { data, error } = await supabase
            .from('user_orders')
            .select()
            .eq('uid', UserId);
        const Subscription = data[0]
        //
        const { data: subsdata, error2 } = await supabase
            .from('user_subscriptions')
            .select()
            .eq('uid', UserId)
            .eq('status', 'Active');
        const subsPeroid = subsdata[0]
        subscriptionStart.value = subsPeroid ? new Date(subsdata[0].subscription_start).toISOString().split('T')[0] : ''
        subscriptionEnd.value = subsPeroid ? new Date(subsdata[0].subscription_end).toISOString().split('T')[0] : ''
        // console.log();
        if (Subscription.order_details.id && Subscription.order_details.status == 'COMPLETED' || '"complete"' && new Date() <= new Date(subscriptionEnd.value) && subsPeroid.status == 'Active') {
            subsState.value = true
            subsStateLoad.value = false
        } else {
            subsState.value = false
            subsStateLoad.value = false
        }
    } catch (error) {
        console.log(error);
    }
}




</script>
<template>
    <div>

        <div v-if="dataview" class="md:w-11/12 min-w-fit px-4 m:py-10 md:p-5 text-center mx-auto"
            :class="theme.global.current.value.dark ? 'text-white bg-zinc-950' : 'text-zinc-800 bg-zinc-100'">
            <div class="back mb-5a py-5 flex justify-start">
                <v-btn to="/" :ripple="false" min-width="50" max-width="50" class="w-fit"><v-icon
                        size="30">mdi-chevron-left</v-icon></v-btn>
            </div>
            <div class="main lg:flex flex-row justify-center text-sm ">
                <div class="1 md:px-10a w-fit md:w-8/12 flex flex-col mx-auto">
                    <div class="flex flex-col justify-center w-fit">
                        <div class="welcome md:flex md:justify-start md:space-x-3 md:p-2 w-fit text-center mx-auto">
                            <div class="w-1.5 h-10 bg-zinc-950 my-auto rounded-sm"></div>
                            <div class="icon p-"><v-img v-if="avatar" :src="avatar" width="60"
                                    class="mx-auto rounded-full outline outline-2 outline-[#00f2ea]"></v-img>
                                <v-icon v-else size="40">mdi-account</v-icon>
                            </div>
                            <p class="font-semibold text-lg md:text-left text-center p-2 my-auto">Welcome, {{
                                displayname
                                }} !
                            </p>
                            <v-btn v-if="!subsStateLoad" readonly variant="tonal"
                                :color="subsState ? 'green' : 'grey-darken-1'"
                                class="flex justify-center text-subtitle text-center align-middle items-center mx-auto my-auto w-fit">
                                {{ subsState ? 'Subscribed' : 'Free' }}</v-btn>

                            <v-skeleton-loader v-else type="chip" class="mx-auto my-auto w-32"></v-skeleton-loader>
                        </div>
                        <div class="logout flex mt-10  w-fit text-center mx-auto"><v-btn @click="LogOut" min-height="40"
                                min-width="120" class="m-5" color="#ff0050"><v-icon
                                    class="mx-1">mdi-exit-to-app</v-icon>Logout</v-btn>
                            <p class="my-auto text-xs md:text-md max-w-[12rem]">Last login: {{ signin }}</p>
                        </div>
                    </div>
                    <div class="bg-zinc-800 w-9/12 mx-auto h-0.5 mt-10 mb-5"></div>


                    <div
                        class="1 min-w-fit md:px-10a w-fit md:w-fit align-middle items-center lg:flex flex-row justify-center space-y-5 space-x-0 md:space-x-5 md:space-y-0  md:p-5">
                        <div
                            class="details md:flex flex-row text-left space-y-5 md:space-y-0 md:space-x-5 space-x-0 w-fit mx-auto">
                            <div
                                class="Accountdetails bg-[#000] left  md:min-h-[22rem] w-full flex-col text-left md:p-5 p-5">

                                <div class="Accountdetails flex space-x-3 py-3 mb-3 text-xs">
                                    <v-icon class="my-auto" size="30">mdi-account-details</v-icon>
                                    <h1 class="text-lg font-semibold my-auto">Account Details:</h1>
                                </div>
                                <!--phone input and suffix-->

                                <div class="data ml-2">
                                    <div class="email flex w-full mb-2">
                                        <p for="id" class="text-md my-auto">Email:</p>
                                        <p class="text-md ml-2 my-auto w-fit">{{ email }}</p>
                                    </div>
                                    <div class="authenticationstate w-full py-2 md:aspace-x-5">
                                        <label class="text-md">Account:</label>
                                        <label for="auth" class="text-md my-auto p-2">{{ auth }}</label>
                                        <template v-if="auth == 'authenticated'">
                                            <v-icon class="mb-1" size="22">mdi-check-decagram</v-icon>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="2  md:min-h-[22rem] w-fit mx-auto">
                            <v-card v-if="!subsStateLoad" color="#ff0050" :elevation="6" variant="outlined"
                                class="details right min-w-fit ma-5 md:min-h-[22rem] flex-col text-left pa-5 text-h7">
                                <div class="Subscriptiondetails flex space-x-3 py-3 mb-3">
                                    <v-icon class="my-auto" size="30">mdi-cloud-sync</v-icon>
                                    <h1 class="text-lg font-semibold my-auto">Subscription Details:</h1>
                                </div>
                                <div class="statues px-5">
                                    <p class="text-md inline-block text-white">Subscription Status: </p> <v-btn readonly
                                        variant="text" :color="subsState ? 'green' : 'grey-darken-1'"
                                        class="flex justify-center text-center align-middle items-center mx-auto my-auto w-fit">
                                        {{ subsState ? 'Subscribed' : 'Free' }}</v-btn>
                                </div>

                                <div v-if="subsState" class="start px-5">
                                    <p class="text-xl py-2">Start Date:</p> <v-btn readonly variant="text"
                                        :color="subsState ? 'green' : 'grey-darken-1'"
                                        class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                        {{ subsState ? subscriptionStart : 'not available' }}</v-btn>
                                </div>
                                <div v-if="subsState" class="end px-5">
                                    <p class="text-xl py-2">End Date:</p>
                                    <v-btn readonly variant="text" :color="subsState ? 'red-darken-4' : 'grey-darken-1'"
                                        class="flex justify-center text-h6 text-center mx-auto my-auto w-fit">
                                        {{ subsState ? subscriptionEnd : 'not available' }}</v-btn>
                                </div>

                                <div v-if="subsState" class="manage w-fit bg-zinc-7a00 flex my-auto px-5">
                                    <!-- <v-btn @click="cancelSubs" type="button" max-height="40" min-height="40" variant="tonal"
                                    color="red" :ripple="false" :elevation="1" class="m-5a w-fit"> -->
                                    <CancelationDialog class="w-fit my-auto" @fetch-subs="fetchUserSubs" />
                                    <!-- </v-btn> -->
                                    <v-btn @click="" disabled type="button" max-height="40" min-height="40"
                                        variant="tonal" color="green" :ripple="false" :elevation="0" class="m-5 w-fit">
                                        Renew
                                    </v-btn>
                                </div>
                                <div v-else class="subscribe">
                                    <v-btn to="#plans" @click="" type="button" max-height="40" min-height="40"
                                        variant="outlined" color="green" :elevation="0" class="m-5 w-fit">
                                        <v-icon class="mr-1">mdi-plus-thick</v-icon> Subscribe now
                                    </v-btn>
                                </div>

                            </v-card>
                            <v-skeleton-loader v-else type="image" min-width="300" max-height="150"
                                class="my-auto"></v-skeleton-loader>
                        </div>
                        <!------------>

                        <v-card v-if="!subsStateLoad" color="#ff0050" :elevation="4" variant="tonal" :border="true"
                            class="GAMES right ma-5 min-w-fit max-w-fit flex flex-row text-left mx-auto pa-6 text-h7">
                            <div class="Games flex space-x-3 py-3 mb-3">
                                <v-icon color="#00f2ea" class="my-auto" size="30">mdi-gamepad-square</v-icon>
                                <h1 class="text-lg font-semibold my-auto text-[#00f2ea]">Select a game</h1>
                            </div>
                            <div class="games md:flex flex-row space-y-5 md:space-y-0 min-h-fit mx-auto amax-w-fit">
                                <div class="1 flex flex-col  px-2 mx-auto text-center ">
                                    <div class="statues">
                                        <v-img cover src="/street_racing.webp"
                                            class="min-w-[5rem] min-h-[4rem] max-w-[5rem] max-h-[4rem] mx-auto rounded-sm brightness-125 "
                                            width="130" height="90" alt="street racing">
                                            <p class="bottom-0 absolute text-md font-semibold text-red-800">Street
                                                Racing
                                            </p>
                                        </v-img>
                                    </div>
                                    <v-btn :variant="subsState ? 'outlined' : 'outlined'"
                                        :color="subsState ? 'red-darken-4' : 'grey-darken-1'"
                                        class="text-center mx-auto mt-2 m-2 my-auto max-w-fit w-fit">
                                        {{ subsState ? 'GO LIVE !' : 'Subscribe' }}</v-btn>
                                </div>
                                <div class="2 flex flex-col  px-2 mx-auto text-center ">
                                    <div class="statues">
                                        <v-img cover src="/zombie_hunters.webp"
                                            class="min-w-[5rem] min-h-[4rem] max-w-[5rem] max-h-[4rem] mx-auto rounded-sm brightness-125 "
                                            width="130" height="90" alt="street racing">
                                            <p class="bottom-0 absolute text-md font-semibold text-red-800">Zombie
                                                Haunters
                                            </p>
                                        </v-img>
                                    </div>
                                    <v-btn disabled :variant="subsState ? 'tonal' : 'outlined'"
                                        :color="subsState ? 'red-lighten-4' : 'grey-darken-1'"
                                        class="text-center mx-auto mt-2 m-2 my-auto max-w-fit w-fit">
                                        {{ subsState ? 'Soon' : 'Soon' }}</v-btn>
                                </div>
                                <div class="3 flex flex-col  px-2 mx-auto text-center ">
                                    <div class="statues">
                                        <v-img cover src="/trivia.webp"
                                            class="min-w-[5rem] min-h-[4rem] max-w-[5rem] max-h-[4rem] mx-auto rounded-sm brightness-125 "
                                            width="130" height="90" alt="street racing">
                                            <p class="bottom-0 absolute text-md font-semibold text-red-800">Trivia
                                            </p>
                                        </v-img>
                                    </div>
                                    <v-btn disabled :variant="subsState ? 'tonal    ' : 'outlined'"
                                        :color="subsState ? 'red-lighten-4' : 'grey-darken-1'"
                                        class="text-center mx-auto mt-2 m-2 my-auto max-w-fit w-fit">
                                        {{ subsState ? 'Soon' : 'Soon' }}</v-btn>

                                </div>
                            </div>
                            <div v-if="!subsState" class="subscribe">
                                <v-btn to="#plans" @click="" type="button" max-height="40" min-height="40"
                                    variant="tonal" color="green" :elevation="0" class="m-5 w-fit">
                                    Subscribe To Play
                                </v-btn>
                            </div>

                        </v-card>
                        <v-skeleton-loader v-else type="image" min-width="300" max-height="150"
                            class="my-auto"></v-skeleton-loader>
                    </div>
                </div>
                <div class="2 md:px-10  max-w-[22rem] mx-auto my-5 md:min-w-fit text-sm">
                    <v-card class="states lg:-ml-[7rem] min-w-fit flex-col text-left pa-5 " color="#00f2ea"
                        variant="tonal">
                        <div class="title flex mb-3">
                            <v-icon class="mx-2" size="30">mdi-pulse</v-icon>
                            <h1 class="text-lg font-semibold ">Status:</h1>
                        </div>
                        <div class="content w-fit">
                            <div class="game flex px-5">
                                <h1 class="text-md py-2 text-white">Game Server: </h1>
                                <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                    class="flex justify-center text-sm text-center mx-auto my-auto w-fit">
                                    {{ apiState ? 'Operational' : 'down' }}</v-btn>
                            </div>
                            <div class="api flex px-5">
                                <h1 class="text-md py-2 text-white">API: </h1>
                                <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                    class="flex justify-center text-sm text-center mx-auto my-auto w-fit">
                                    {{ apiState ? 'Operational' : 'down' }}</v-btn>
                            </div>
                            <div class="run flex px-5">
                                <h1 class="text-md py-2 text-white">Game Access: </h1>
                                <v-btn readonly variant="text" :color="!apiState ? 'green-darken-1' : '#ff0050'"
                                    class="flex justify-center text-sm text-center mx-auto my-auto w-fit"
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
            <div v-if="!subsState">
                <SubsPlans />
            </div>
            <div class="bg-zinc-800 w-1/3 mx-auto h-0.5 mt-10 mb-5"></div>
        </div>
    </div>
</template>