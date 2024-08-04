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
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
onMounted(() => {
    FetchUserData()
    fetchUserSubsStripe()
    getLiveid()
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
const subsPlan = ref('')
const autoPay = ref('')
const subsPeroid = ref();
const subscriptionStart = ref('');
const subscriptionEnd = ref('');
const cancelStatus = ref('')
// async function fetchUserSubs() {
//     const user = useSupabaseUser();
//     const UserId = user.value.id
//     try {
//         const { data, error } = await supabase
//             .from('user_orders')
//             .select()
//             .eq('uid', UserId);
//         const Subscription = data[0]
//         //
//         const { data: subsdata, error2 } = await supabase
//             .from('user_subscriptions')
//             .select()
//             .eq('uid', UserId)
//             .eq('status', 'Active');
//         const subsPeroid = subsdata[0]
//         subscriptionStart.value = subsPeroid ? new Date(subsdata[0].subscription_start).toISOString().split('T')[0] : ''
//         subscriptionEnd.value = subsPeroid ? new Date(subsdata[0].subscription_end).toISOString().split('T')[0] : ''
//         // console.log();
//         if (Subscription.order_details.id && Subscription.order_details.status == 'COMPLETED' || '"complete"' && new Date() <= new Date(subscriptionEnd.value) && subsPeroid.status == 'Active') {
//             subsState.value = true
//             subsStateLoad.value = false
//         } else {
//             subsState.value = false
//             subsStateLoad.value = false
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// fetch stripe subscription
const fetchUserSubsStripe = async () => {
    const user = useSupabaseUser();
    // console.log(user.value);
    const cus_id = user.value.user_metadata.stripe_cus_id; // Replace with the actual subscription ID
    if (cus_id) {


        try {
            const response = await fetch('/api/get-user-subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cus_id }),
            });

            const result = await response.json();
            if (result.success) {
                // message.value = 'Subscription cancelled successfully.';
                const sss = result.subscription.data[0]
                // console.log('Subscription called successfully.' + JSON.stringify(sss));

                if (result.subscription?.data[0]?.status == 'active') {
                    subsPlan.value = sss ? sss.items.data[0].metadata?.name ? sss.items.data[0].metadata?.name : (sss.plan.id == 'price_1PbY0cI4aHqhinrAO1CYGfDG' ? 'Daily' : 'Monthly') + ' - ' + (sss.plan.amount / 100).toFixed(0) + sss.plan.currency.toUpperCase() : ''
                    autoPay.value = sss ? sss.collection_method : ''
                    subscriptionStart.value = sss ? new Date(sss.current_period_start * 1000).toISOString().split('T')[0] : ''
                    subscriptionEnd.value = sss ? new Date(sss.current_period_end * 1000).toISOString().split('T')[0] : ''
                    cancelStatus.value = sss ? sss.cancel_at_period_end ? 'Valid till end of billing' : 'Subscribed' : ''
                    subsState.value = true
                    subsStateLoad.value = false
                } else {
                    subsState.value = false
                    subsStateLoad.value = false
                }
            } else {
                // message.value = `Failed to cancel subscription: ${result.error}`;
                console.log(`Failed to call subscription: ${result.error}`);
            }
        } catch (error) {
            // message.value = `Error: ${error.message}`;
            console.log(`Error: ${error.message}`);
        }
    } else {
        subsState.value = false
        subsStateLoad.value = false
    }
};

// start the live game
const startGame = ref(false);

// get liveId
const userLiveId = ref('');
const getLiveid = async () => {
    try {
        const { data: userdata, error2 } = await supabase.auth.getSession();
        // loading.value = true
        const { data, error } = await supabase
            .from('usersettings')
            .select()
            .eq('email', userdata.session.user.email)

        if (!error) {
            // console.log('Live ID:.' + JSON.stringify(result));
            userLiveId.value = data[0].liveid
            // loading.value = false
        } else {
            // console.log(`Failed to update Live ID: ${result.error}`);
            userLiveId.value = result.error;
            // loading.value = false
        }

    } catch (error) {
        console.log(`Error: ${error.message}`);
        // loading.value = false
    }
};
</script>
<template>
    <div>

        <div v-if="dataview" class="text-subtitle-1 md:w-11/12 min-w-fit px-4 m:py-10 md:p-5 text-center mx-auto"
            :class="theme.global.current.value.dark ? 'text-white bg-zinc-950' : 'text-zinc-800 bg-zinc-100'">
            <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                <div class="back mb-5a py-5 flex justify-start">
                    <v-btn to="/" :ripple="false" min-width="50" max-width="50" class="w-fit"><v-icon
                            size="30">mdi-chevron-left</v-icon></v-btn>
                </div>
                <div class="main lg:flex flex-row justify-center text-sm ">
                    <div class="1 md:px-8a w-fit md:w-8/12 flex flex-col mx-auto">
                        <div class="flex flex-col justify-center w-fit">
                            <div class="welcome md:flex md:justify-start md:space-x-3 md:p-2 w-fit text-center mx-auto">
                                <div class="w-1.5 h-10 bg-zinc-950 my-auto rounded-sm"></div>
                                <div class="icon p-"><v-img v-if="avatar" :src="avatar" width="60"
                                        class="mx-auto rounded-full outline outline-2 outline-[#00f2ea]"></v-img>
                                    <v-icon v-else size="40">mdi-account</v-icon>
                                </div>
                                <p class="font-semibold text-lg md:text-left text-center p-2 my-auto">{{
                                    $t('welcomeuser')
                                    }}, {{
                                        displayname
                                    }} !
                                </p>

                                <v-btn v-if="!subsStateLoad" readonly variant="tonal"
                                    :color="subsState ? 'green' : 'grey-darken-1'"
                                    class="flex justify-center text-subtitle text-center align-middle items-center mx-auto my-auto w-fit">
                                    {{ subsState ? $t('substate1') : $t('substate2') }}</v-btn>

                                <v-skeleton-loader v-else type="chip" class="mx-auto my-auto w-32"></v-skeleton-loader>
                            </div>
                            <p v-if="userLiveId" class="font-sans text-lg inline-block p-2">{{ $t('liveid') }}:
                            <p class="font-semibold inline-block text-sm">{{ userLiveId }}</p>
                            </p>
                            <div class="logout flex mt-10  w-fit text-center mx-auto"><v-btn @click="LogOut"
                                    min-height="40" min-width="120" class="m-5" color="#ff0050"><v-icon
                                        class="mx-1">mdi-exit-to-app</v-icon>{{ $t('logout') }}</v-btn>
                                <p class="my-auto text-xs md:text-md max-w-[12rem]">{{ $t('lastlogin') }}: {{ signin }}
                                </p>
                            </div>
                        </div>
                        <div class="bg-zinc-800 w-9/12 mx-auto h-0.5 mt-10 mb-5"></div>


                        <div
                            class="1 min-w-fit md:px-10a w-fit md:w-fit align-middle items-center lg:flex flex-row justify-center space-y-5 space-x-0 md:space-x-5 md:space-y-0  md:p-5">
                            <div
                                class="details md:flex flex-row text-left min-w-[20rem] space-y-5 md:space-y-0 md:space-x-5 space-x-0 w-fit mx-auto">
                                <div
                                    class="Accountdetails bg-[#000] left  md:min-h-[22rem] w-full flex-col text-left md:p-5 p-5">

                                    <div class="Accountdetails flex space-x-3 py-3 mb-3 text-xs">
                                        <v-icon class="my-auto" size="30">mdi-account-details</v-icon>
                                        <h1 class="text-xl mr-3 font-semibold my-auto">{{ $t('accountdetails') }}:</h1>
                                    </div>
                                    <!--phone input and suffix-->

                                    <div class="data ml-2">
                                        <div class="email flex w-full mb-2">
                                            <p for="id" class="text-md my-auto">{{ $t('accountemail') }}:</p>
                                            <p class="md:text-md text-sm ml-2 mr-2 my-auto w-fit">{{ email }}</p>
                                        </div>
                                        <div class="authenticationstate flex w-full py-2 md:aspace-x-5">
                                            <p class="text-md  my-auto">{{ $t('accountstate') }}:</p>
                                            <p for="auth" class="md:text-md text-sm ml-2 mr-2 my-auto w-fit">{{ auth
                                                }}<v-icon class="ml-1" size="20">mdi-check-decagram</v-icon></p>
                                            <template v-if="auth == 'authenticated'">

                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="2  md:min-h-[22rem] w-fit mx-auto font-sans">
                                <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                                    <v-card v-if="!subsStateLoad" color="#ff0050" :elevation="6" variant="outlined"
                                        class="details right min-w-fit text-body-1 font-weight-thin ma-md-5 md:min-h-[22rem] md:min-w-[22rem] flex-col text-lefta pa-md-5 pa-1 text-h7">
                                        <div class="Subscriptiondetails flex p-3 space-x-3 py-3 mb-3">
                                            <v-icon class="my-auto" size="30">mdi-cloud-sync</v-icon>
                                            <h1 class="text-2xl  mr-3 font-semibolda my-auto font-sans font-bold">{{
                                                $t('subsdetails')
                                                }}:
                                            </h1>
                                        </div>
                                        <div class="plan px-5 ">
                                            <p class="text-lg inline-block text-white font-sans font-bold">{{
                                                $t('subsplan')
                                                }}:
                                            </p>
                                            <p class="text-center font-sans font-semibold p-2 aw-fit amax-w-[15rem]">
                                                {{ subsState ? subsPlan : $t('substate2') }}</p>
                                        </div>
                                        <div class="pay px-5"
                                            v-if="autoPay && cancelStatus != 'Valid till end of billing'">
                                            <p class="text-md inline-block text-white font-sans font-bold">{{ $t('ap')
                                                }}:
                                            </p>
                                            <p
                                                class="text-center text-lg font-sans font-semibold p-2 aw-fit max-w-[18rem]">
                                                {{ autoPay ? autoPay + ' - ' + $t('on') : '' }}</p>
                                        </div>
                                        <div class="statues px-5">
                                            <p class="text-lg inline-block text-white font-sans font-bold">{{
                                                $t('substatetitle') }}:
                                            </p> <v-btn readonly variant="text"
                                                :color="subsState ? 'green' : 'grey-darken-1'"
                                                class="flex justify-center text-center font-sans font-semibold align-middle items-center mx-auto my-auto w-fit">
                                                {{ subsState ? cancelStatus : $t('substate2') }}</v-btn>
                                        </div>

                                        <div v-if="subsState" class="start px-5">
                                            <p class="text-xl py-2 font-sans font-bold">{{ $t('sd') }}:</p> <v-btn
                                                readonly variant="text" :color="subsState ? 'green' : 'grey-darken-1'"
                                                class="flex justify-center text-h6 text-center font-sans font-semibold mx-auto my-auto w-fit">
                                                {{ subsState ? subscriptionStart : $t('notavailable') }}</v-btn>
                                        </div>
                                        <div v-if="subsState" class="end px-5">
                                            <p class="text-xl py-2 font-sans font-bold">{{ $t('ed') }}:</p>
                                            <v-btn readonly variant="text"
                                                :color="subsState ? 'red-darken-4' : 'grey-darken-1'"
                                                class="flex justify-center text-h6 text-center font-sans font-semibold mx-auto my-auto w-fit">
                                                {{ subsState ? subscriptionEnd : $t('notavailable') }}</v-btn>
                                        </div>

                                        <div v-if="subsState" class="manage w-fit bg-zinc-7a00 flex my-auto px-5">
                                            <!-- <v-btn @click="cancelSubs" type="button" max-height="40" min-height="40" variant="tonal"
                                    color="red" :ripple="false" :elevation="1" class="m-5a w-fit"> -->
                                            <CancelationDialog class="w-fit my-auto"
                                                @fetch-subs="fetchUserSubsStripe" />
                                            <!-- </v-btn> -->
                                            <v-btn @click="" disabled type="button" max-height="40" min-height="40"
                                                variant="tonal" color="green" :ripple="false" :elevation="0"
                                                class="m-5 w-fit">
                                                {{ $t('renew') }}
                                            </v-btn>
                                        </div>
                                        <div v-else class="subscribe">
                                            <v-btn to="#plans" @click="" type="button" max-height="40" min-height="40"
                                                variant="outlined" color="green" :elevation="0" class="m-5 w-fit">
                                                <v-icon class="mr-1">mdi-plus-thick</v-icon> {{ $t('subscribe') }}
                                            </v-btn>
                                        </div>

                                    </v-card>
                                    <v-skeleton-loader v-else type="image" min-width="300" max-height="150"
                                        class="my-auto"></v-skeleton-loader>
                                </v-locale-provider>
                            </div>
                            <!------------>

                            <v-card id="LiveGames" v-if="!subsStateLoad" color="#ff0050" :elevation="4" variant="tonal"
                                :border="true"
                                class="GAMES right ma-5 min-w-fit md:max-w-fit max-w-[16rem] flex flex-col text-left mx-auto pa-6 text-h7">
                                <div class="Games flex space-x-3 py-3 mb-3">
                                    <v-icon color="#00f2ea" class="my-auto" size="30">mdi-gamepad-square</v-icon>
                                    <h1 class="text-lg  mr-3 font-semibold my-auto text-[#00f2ea]">{{ $t('selectgame')
                                        }}</h1>
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
                                        <v-btn @click="subsState ? startGame = true : ''"
                                            :variant="subsState ? 'outlined' : 'outlined'"
                                            :color="subsState ? 'red-darken-4' : 'grey-darken-1'"
                                            class="text-center mx-auto mt-2 m-2 my-auto max-w-fit w-fit">
                                            {{ subsState ? $t('golive') : $t('subscribe') }}</v-btn>
                                    </div>
                                    <LiveId :open="startGame" @resetDialog="startGame = false;" />
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
                                            {{ subsState ? $t('soon') : $t('soon') }}</v-btn>
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
                                        <v-btn disabled variant="outlined"
                                            :color="subsState ? 'red-lighten-4' : 'grey-darken-1'"
                                            class="text-center mx-auto mt-2 m-2 my-auto max-w-fit w-fit">
                                            {{ subsState ? $t('soon') : $t('soon') }}</v-btn>

                                    </div>
                                </div>
                                <div v-if="!subsState" class="subscribe">
                                    <v-btn to="#plans" @click="" type="button" max-height="40" min-height="40"
                                        variant="tonal" color="green" :elevation="0" class="m-5 w-fit">
                                        {{ $t('substoplay') }}
                                    </v-btn>
                                </div>

                            </v-card>
                            <v-skeleton-loader v-else type="image" min-width="300" max-height="150"
                                class="my-auto"></v-skeleton-loader>
                        </div>
                    </div>
                    <div class="2 md:px-10  max-w-[22rem] mx-auto my-5 md:min-w-fit text-sm">
                        <v-card class="states lg:-ml-[6rem] lg:-mr-[6rem] min-w-fit flex-col text-left pa-5"
                            color="#00f2ea" variant="tonal">
                            <div class="title flex mb-3">
                                <v-icon class="mx-2" size="30">mdi-pulse</v-icon>
                                <h1 class="text-lg font-semibold ">{{ $t('serverstate') }}:</h1>
                            </div>
                            <div class="content w-fit">
                                <div class="game flex px-5">
                                    <h1 class="text-md py-2 text-white">{{ $t('servergame') }}: </h1>
                                    <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                        class="flex justify-center text-sm text-center mx-auto my-auto w-fit">
                                        {{ apiState ? $t('serverop') : $t('serverdown') }}</v-btn>
                                </div>
                                <div class="api flex px-5">
                                    <h1 class="text-md py-2 text-white">API: </h1>
                                    <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                        class="flex justify-center text-sm text-center mx-auto my-auto w-fit">
                                        {{ apiState ? $t('serverop') : $t('serverdown') }}</v-btn>
                                </div>
                                <div class="run flex px-5">
                                    <h1 class="text-md py-2 text-white">Game Access: </h1>
                                    <v-btn readonly variant="text" :color="apiState ? 'green-darken-1' : 'red-darken-1'"
                                        class="flex justify-center text-sm text-center mx-auto my-auto w-fit"
                                        :prepend-icon="apiState ? '' : 'mdi-alert'">
                                        {{ apiState ? $t('serverop') : $t('serverdown') }}</v-btn>
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
            </v-locale-provider>
        </div>
    </div>
</template>
