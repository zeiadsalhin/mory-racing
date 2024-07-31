<script setup>
useSeoMeta({
    title: 'Chattok Gaming - Login to your account',
    ogTitle: 'Chattok Gaming - Login to your account',
    description: 'Welcome to Chattok Gaming ',
    ogDescription: 'Welcome to Chattok Gaming ',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})

import { useTheme } from 'vuetify'
const theme = useTheme();
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const errMsg = ref()
const emailconfirm = computed(() => route.query.confirmemail)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const dataview = ref()
const authenticating = ref(false)
const props = defineProps(['emailtest']);

// show password
function toggleVisibility() {
    showPassword.value = !showPassword.value;
}

// sign in email
const signIn = async () => {
    authenticating.value = true
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,

    })
    if (error) console.log(error)
    errMsg.value = error
    authenticating.value = false
}

// sign in google
const signInGoogle = async () => {
    authenticating.value = true
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        if (error) {
            throw error
        }
        // authenticating.value = false
    } catch (error) {
        console.log(error);
    }
}

// sign in github
const signInTwitch = async () => {
    authenticating.value = true
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'twitch'
        })

        if (error) {
            throw error
        }
        // authenticating.value = false
    } catch (error) {
        console.log(error);
    }
}

// One click login toggle
const oneClick = ref(false);
const oneClickLogintoggle = (() => {
    oneClick.value = true

})
// Password page toggle
const resetpasswordpage = ref(false);
const resetPasswordPagetoggle = (() => {
    resetpasswordpage.value = true
    oneClick.value = false

})

watch(user, () => {
    if (user.value) {
        // Redirect to protected page
        if (user?.user_metadata?.role == 'admin') {
            navigateTo('/admin')
        } else {
            navigateTo('/user/account')
        }
        return
    } else {
        dataview.value = true
    }
}, { immediate: true })
</script>
<template>
    <div>
        <!-- <v-lazy> -->

        <!--Login Form Body-->
        <!--will only render when no user exist-->
        <div v-if="dataview" class="md:flex">
            <transition name="fade" mode="out-in">
                <v-img src="/b.webp" cover height="100%" class="1 w-full min-h-screen -mt-16">
                    <div
                        class="2 m-3 mt-20 flex flex-col justify-center mx-auto md:min-w-lg md:max-w-lg w-11/12 h-fit rounded-md bg-zinc-950 backdrop-blur-md bg-opacity-75">
                        <div v-if="oneClick == false && resetpasswordpage == false" class="login with email">
                            <div class="logo md:aflex md:w-11/12 mx-auto md:p-5 p-3 justify-center">
                                <!-- <v-img src="/icon.ico" :class="theme.global.current.value.dark ? '' : 'bg-zinc-800'"
                                class="m-2 h-20 maax-auto" width="200" alt="logo"></v-img> -->
                                <div class="1 mx-auto">
                                    <h1
                                        class="flex justify-center text-3xl md:text-3xl  my-auto text-center font-semibold p-2">
                                        <p class="text-[#ff0050] mr-1">Chattok</p>
                                        <p class="my-auto">Gaming</p>
                                        <div class="w-10 my-auto">
                                            <div class="w-11/12 h-1 bg-[#ff0050] m-1"></div>
                                            <div class="w-9/12 h-1 bg-[#00f2ea] m-1"></div>
                                            <div class="w-2/3  h-1 bg-[#000] m-1"></div>
                                        </div>
                                    </h1>
                                </div>
                                <div class="2 my-auto">
                                    <h1
                                        class="text-sm md:text-sm my-auto text-center mx-auto font-medium  bg-[#ff0050] rounded-sm opacity-80 px-2 py-1">
                                        {{ $t('login') }}
                                    </h1>
                                </div>
                            </div>
                            <!--Confirmation-->
                            <p v-if="emailconfirm"
                                class="w-10/12 mt-5 mx-auto text-xs shadow-md rounded-sm bg-green-600 text-white my-2 p-3">
                                <v-icon class="mx-1" size="25">mdi-email-check</v-icon>A
                                confirmation
                                sent to Your
                                email:
                            <p class="underline inline-block">{{ emailconfirm
                                }}</p>, Please confirm it before signing in.</p>

                            <div class="md:flex flex w-9/12 justify-center text-center mx-auto p-3">
                                <v-btn @click="signInGoogle" min-height="45" min-width="80" class="m-2"
                                    color="grey-lighten-2">
                                    <v-icon size="30" class="m-1 w-full">
                                        <Google />
                                    </v-icon></v-btn>
                                <v-btn @click="signInTwitch" min-height="45" min-width="80" class="m-2"
                                    color="purple-darken-2">
                                    <v-icon size="30" class="m-1 w-full">mdi-twitch</v-icon></v-btn>
                            </div>

                            <!--Separator-->
                            <div class="flex justify-center mx-auto w-11/12 md:w-1/3 p-2">
                                <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                                <p class="text-center my-auto text-xl font-semibold w-16">Or</p>
                                <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                            </div>

                            <form id="form"
                                class="p-2 w-11/12 md:w-2/3 h-fit text-center mx-auto justify-center flex-col"
                                @submit.prevent="signIn">
                                <!--input fields-->
                                <v-text-field variant="outlined" label="Email*" id="email" v-model="email"
                                    :color="theme.global.current.value.dark ? '#ff0050' : '#ff0050'"
                                    :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                    spellcheck="false" type="email" @focus="isFocused2 = true"
                                    @blur="isFocused2 = false" required />
                                <!---->
                                <div class="flex  w-full  bg-whiate  rounded-md ">
                                    <v-text-field variant="outlined" label="Password*" id="password" v-model="password"
                                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append-inner="toggleVisibility"
                                        :color="theme.global.current.value.dark ? '#ff0050' : '#ff0050'"
                                        :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                        class="my-auto p-" :type="showPassword ? 'text' : 'password'" minlength="6"
                                        @focus="isFocused4 = true" @blur="isFocused4 = false" required></v-text-field>

                                </div>
                                <div class="options flex justify-between mx-auto w-full text-sm mt-">
                                    <!-- <NuxtLink to="#oneClickLogin"> -->
                                    <button type="button" @click="oneClickLogintoggle"
                                        class="py- text-xs opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">
                                        OneClick Login
                                    </button>
                                    <!-- </NuxtLink> -->
                                    <button type="button" @click="resetPasswordPagetoggle"
                                        class="py- text-xs opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">
                                        Forget Password?
                                    </button>
                                </div>
                                <!--Display error message if any-->
                                <p class="bg-red-700 m-3 rounded-sm" v-if="errMsg">{{ errMsg.message }}</p>

                                <!--Submit button-->
                                <v-btn @click="" type="submit" max-height="44" min-height="44" variant="outlined"
                                    color="#ff0050" :prepend-icon="authenticating ? '' : 'mdi-play'" :ripple="false"
                                    :elevation="1" class="m-5 w-44 text-lg rounded-md hover:cursor-pointer">
                                    <v-progress-circular v-if="authenticating" width="2" size="20" color="#ff0050"
                                        class="m-1" indeterminate></v-progress-circular>
                                    Log in
                                </v-btn>
                                <div class="flex w-fit md:space-x-5 space-x-3 text-xs mx-auto mt-">
                                    <!--navigate to login page-->
                                    <p class="mr- my-auto text-center md:text-sm text-xs">Don't have an account?</p>
                                    <NuxtLink to="/signup" class="text-[#ff0050]"><button type="button"
                                            class="py-2 opacity-100 w-fiat mx-auto block hover:underline">
                                            Sign Up
                                        </button></NuxtLink>
                                </div>
                            </form>
                        </div>
                        <div v-if="oneClick">
                            <OneClickLogin />
                        </div>
                        <div v-if="resetpasswordpage">
                            <requestPasswordReset />
                        </div>
                    </div>
                </v-img>
            </transition>
        </div>

        <!--  </v-lazy> -->
        <!--End of Body-->
    </div>
</template>