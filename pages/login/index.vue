<script setup>
useSeoMeta({
    title: 'Mory Racing - Login to your account',
    ogTitle: 'Mory Racing - Login to your account',
    description: 'Welcome to Mory racing game',
    ogDescription: 'Welcome to Mory racing game',
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
function move() {
    document.querySelector(".label").classList.add("-translate-y-8")
    document.querySelector(".label").classList.add("-translate-x-1")
    document.querySelector(".text").classList.add("outline")
}
function back() {
    if (document.querySelector("#email").value == '') {
        document.querySelector(".label").classList.remove("-translate-y-8")
        document.querySelector(".label").classList.remove("-translate-x-2")
    } else {
        document.querySelector(".text").classList.add("outline-2")
    }
}
function movep() {
    document.querySelector(".labelp").classList.add("-translate-y-8")
    document.querySelector(".labelp").classList.add("-translate-x-1")
    document.querySelector(".pass").classList.add("outline")
}
function backp() {
    if (document.querySelector("#pass").value == '') {
        document.querySelector(".labelp").classList.remove("-translate-y-8")
        document.querySelector(".labelp").classList.remove("-translate-x-2")
    } else {
        document.querySelector(".pass").classList.add("outline-2")
    }
}
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
const signInGithub = async () => {
    authenticating.value = true
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
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
const oneClick = ref(false)
const oneClickLogintoggle = (() => {
    oneClick.value = true

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
        <!--Login Form Body-->
        <!--will only render when no user exist-->
        <div v-if="dataview" class="md:flex p- md:p-  amt-5">
            <div class="1 w-full flex justify-end"
                style="background: url('/b.webp'), no-repeat;background-attachment: fixed;background-size: cover; width: 100%;height:100vh ">
                <div
                    class="2 md:my-2a0 m-3 flex-col justify-center mx-auto md:w-1/3 h-fit shadow-2xla rounded-md bg-zinc-950 backdrop-blur-sm bg-opacity-75">
                    <div v-if="!oneClick" class="login with email">
                        <div class="logo flex w-fit mx-auto p-2 justify-center">
                            <v-img src="/icon.ico" :class="theme.global.current.value.dark ? '' : 'bg-zinc-800'"
                                class="m-2 h-20 maax-auto" width="200" alt="logo"></v-img>
                            <h1 class="text-3xl amb-5 md:text-4xl my-auto text-center font-bold p-5">Log in</h1>
                        </div>
                        <!--Confirmation-->
                        <p v-if="emailconfirm"
                            class="fleax flex-roaw w-10/12 mt-5 mx-auto shadow-md rounded-sm bg-green-600 text-white my-2 p-3">
                            <v-icon class="mx-1" size="20">mdi-email-check</v-icon>A
                            confirmation
                            sent to Your
                            email:
                        <p class="underline inline-block">{{ emailconfirm
                            }}</p>, Please confirm it before signing in.</p>


                        <!-- <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-gray-600 dark:bg-gray-900"></div> -->
                        <!--login with google-->
                        <div class="md:flex flex-col w-9/12 justify-center text-center mx-auto p-3">
                            <v-btn @click="signInGoogle" min-height="45" min-width="150" class="m-2"
                                color="blue-darken-3">
                                <v-icon size="30" class="m-1 w-full">mdi-google</v-icon>Login With Google</v-btn>
                            <v-btn @click="signInGithub" min-height="45" min-width="150" class="m-2" color="gry">
                                <v-icon size="30" class="m-1 w-full">mdi-github</v-icon>Login With Github</v-btn>
                        </div>

                        <!--Separator-->
                        <div class="flex justify-center mx-auto w-11/12 md:w-1/3 p-2">
                            <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                            <p class="text-center my-auto text-xl font-semibold w-16">Or</p>
                            <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                        </div>



                        <form id="form"
                            class="space-y-5a p-2 w-11/12 md:w-2/3 h-fit text-center mx-auto justify-center flex-col"
                            @submit.prevent="signIn">
                            <!--input fields-->
                            <v-text-field variant="outlined" label="Email*" id="email" v-model="email"
                                :color="theme.global.current.value.dark ? '' : 'surface'"
                                :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'" spellcheck="false"
                                type="email" @focus="isFocused2 = true" @blur="isFocused2 = false" required />
                            <!---->
                            <div class="flex  w-full  bg-whiate  rounded-md ">
                                <v-text-field variant="outlined" label="Password*" id="password" v-model="password"
                                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="toggleVisibility"
                                    :color="theme.global.current.value.dark ? '' : 'surface'"
                                    :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                    class="my-auto p-" :type="showPassword ? 'text' : 'password'"
                                    @input="validatePassword()" minlength="6" @focus="isFocused4 = true"
                                    @blur="isFocused4 = false" required></v-text-field>

                            </div>
                            <div class="options flex justify-between mx-auto w-full text-sm mt-">
                                <!-- <NuxtLink to="#oneClickLogin"> -->
                                <button type="button" @click="oneClickLogintoggle"
                                    class="py- opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">
                                    OneClick Login
                                </button>
                                <!-- </NuxtLink> -->
                                <NuxtLink to="/login/requestPasswordReset"><button type="button"
                                        class="py- opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">
                                        Forget Password?
                                    </button></NuxtLink>
                            </div>
                            <!--Display error message if any-->
                            <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>

                            <!--Submit button-->
                            <v-btn @click="" type="submit" max-height="44" min-height="44" variant="tonal"
                                prepend-icon="mdi-play" :ripple="false" :elevation="1"
                                class="m-5 w-44 text-lg rounded-md hover:cursor-pointer">
                                <v-progress-circular v-if="authenticating" width="2" size="20" color="darken-blue-4"
                                    class="m-1" indeterminate></v-progress-circular>
                                Log in
                            </v-btn>
                            <div class="flex w-fit space-x-5 mx-auto mt-">
                                <!--navigate to login page-->
                                <p class="mr- my-auto text-center">Don't have an account?</p>
                                <NuxtLink to="/signup"><button type="button"
                                        class="py-2 opacity-70 w-fiat mx-auto block hover:underline">
                                        Sign Up
                                    </button></NuxtLink>
                            </div>
                            <!--Return to Sign Up page-->
                            <!-- <NuxtLink to="/signup"><button
                        class="px-5 m-5 py-2 w-fit hover:cursor-pointer mx-auto block hover:underline">
                        return to Sign Up
                    </button></NuxtLink> -->
                        </form>
                    </div>
                    <div v-else>
                        <OneClickLogin />
                    </div>
                </div>
            </div>
        </div>
        <!--End of Body-->
    </div>
</template>