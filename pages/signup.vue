<script setup>
useSeoMeta({
    title: 'Chattok Gaming - Register new user',
    ogTitle: 'Chattok Gaming - Register new user',
    description: 'Welcome to Chattok Gaming',
    ogDescription: 'Welcome to Chattok Gaming',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})

import { useTheme } from 'vuetify'
const theme = useTheme();
// import Swal from 'sweetalert2'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()
const isFocused1 = ref(false)
const isFocused2 = ref(false)
const isFocused3 = ref(false)
const isFocused4 = ref(false)
const errMsg = ref()
const displayname = ref('')
const email = ref('')
const password = ref('')
const capital = ref(false)
const special = ref(false)
const number = ref(false)
const minlength = ref(false)
const passwordStrength = computed(() => Math.min(password.value.length * 15, 100));
const showPassword = ref(false)
const phone = ref('')
const dataview = ref()
const authenticating = ref(false)
// show password
function toggleVisibility() {
    showPassword.value = !showPassword.value;
}
// validate password
function validatePassword() {
    var hasCapitalLetter = /[A-Z]/.test(password.value);
    var hasNumber = /\d/.test(password.value);
    var hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);
    var hasMinLength = password.value.length >= 6;

    if (hasCapitalLetter) {
        // console.log('capital letter');
        capital.value = true
        // passwordStrengthColor
    } else {
        capital.value = false
    } if (hasNumber) {
        // console.log('has number');
        number.value = true
    } else {
        number.value = false
    } if (hasSpecialCharacter) {
        // console.log('has special');
        special.value = true
    } else {
        special.value = false
    } if (hasMinLength) {
        // console.log('min length reached');
        minlength.value = true
    } else {
        minlength.value = false
    }
}
const passwordStrengthColor = computed(() => {
    if (capital.value && special.value && number.value && minlength.value) {
        return 'green';
    } else if (capital.value || special.value || number.value) {
        return 'orange';
    } else {
        return 'red';
    }
});
const snackbarshow = ref(false)
async function signUpNewUser() { // Registration new user

    if ((capital.value && number.value && special.value && minlength.value) == false) {
        // console.log('password weak');
        return
    } else {
        try {
            authenticating.value = true
            const { data, error } = await supabase.auth.signUp({
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        name: displayname.value,
                        full_name: displayname.value,
                        // last_name: 'second name',
                        // role: 'user',
                        // phone: phone.value,
                    },
                }
            })

            if (error) { throw error }; // throw console error
            // successMsg.value = 'Success'
            console.log('Signed up successfully')
            snackbarshow.value = true
            setTimeout(() => {
                router.push({ path: '/login', query: { confirmemail: email.value, token: data.user.id } }) // Navigate to login and pass email and token
            }, 1000);
            // console.log(data);

            // register user in newsletter
            const { data2, error2 } = await supabase.from('NewsletterSubs').insert({ email: email.value });
            if (error2) {
                Swal.fire({
                    title: 'Error Submitting',
                    icon: 'error',
                    text: error2.message,
                    toast: true,
                    timer: 3000,
                    showConfirmButton: false,
                })
                throw error2
            }; // throw console error
        } catch (error) {
            errMsg.value = error.message
            console.log(error)
            authenticating.value = false
        }
    }
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

watch(user, () => {
    if (user.value) {
        // Redirect to protected page
        navigateTo('/')
    } else {
        dataview.value = true
    }
}, { immediate: true })
</script>
<template>
    <transition name="fade" mode="out-in">
        <v-img src="/signup.webp" cover height="100%" class="1 w-full min-h-screen">
            <!--Form Body-->
            <!--will only render when no user exist-->
            <div v-if="dataview" :class="theme.global.current.value.dark ? 'bg-zinc-8a00 text-white' : ' text-black'"
                class="md:flex md:justify-around mx-auto md:space-x-20 h-fit w-full">

                <div
                    class="left md:w-2/5 h-fit rounded-md bg-zinc-950 backdrop-blur-md bg-opacity-80 shadow-2xl  shadow-zinc-950 m-2">
                    <h1 class="text-3xl md:text-4xl text-center font-extrabold p-5 mt-2">Sign Up</h1>
                    <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-[#ff0050]"></div>

                    <form id="form"
                        class="p-5 text-center text-sm mx-auto justify-center flex-col w-full md:w-9/12 mt-3"
                        @submit.prevent="signUpNewUser">
                        <div class="userdata w-full md:grid grid-cols-2  gap-1">

                            <div class="form flex justify-center">
                                <!-- <label class=" text-lg md:text-xl text-right p-3">Name<span
                                class="required text-red-600">*</span></label> -->
                                <v-text-field variant="outlined" label="Name*" id="name" type="name"
                                    v-model="displayname"
                                    :color="theme.global.current.value.dark ? '#ff0050' : 'surface'"
                                    :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                    spellcheck="false" required></v-text-field>
                            </div>
                            <!--Error Message-->
                            <p id="errorn" class="hidden text-sm text-red-700">Please Check your Name</p>

                            <div class="form flex justify-center">
                                <!-- <label class="  text-lg md:text-xl  p-3">Email<span
                                class="required text-red-600">*</span></label> -->
                                <v-text-field variant="outlined" label="Email*" id="email" v-model="email"
                                    :color="theme.global.current.value.dark ? '#ff0050' : 'surface'"
                                    :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                    spellcheck="false" type="email" @focus="isFocused2 = true"
                                    @blur="isFocused2 = false" required />

                            </div>
                            <!--Error Message email-->
                            <p id="errore" class="hidden text-sm text-red-700">Please Check your Email</p>
                        </div>

                        <div class="form mb- flex justify-center">
                            <!-- <label class=" text-lg md:text-xl text-center p-2">Password<span
                            class="required text-red-600">*</span></label> -->
                            <div class="flex  w-full  bg-whiate  rounded-md ">
                                <v-text-field variant="outlined" label="Password*" id="password" v-model="password"
                                    :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:append-inner="toggleVisibility"
                                    :color="theme.global.current.value.dark ? '#ff0050' : 'surface'"
                                    :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'"
                                    class="my-auto p-" :type="showPassword ? 'text' : 'password'"
                                    @input="validatePassword()" minlength="6" @focus="isFocused4 = true"
                                    @blur="isFocused4 = false" required />
                            </div>
                        </div>

                        <!--Error Message password-->
                        <p id="errorp" class="hidden text-sm text-red-700">Please Check your Password</p>
                        <span class="tick-list block text-sm text-left p-2 -mt-2 mb-5 space-y-1">
                            <div class="passwordchecker w-10/12 mx-auto">
                                <v-progress-linear v-if="password" :model-value="passwordStrength"
                                    :color="passwordStrengthColor" height="5"></v-progress-linear>
                            </div>

                            <ul>Must Include</ul>
                            <div class="main flex p-1 text-xs">
                                <div class="1">
                                    <li :class="capital ? 'text-green-500' : 'text-red-600'"><v-icon size="20">{{
                                        capital ?
                                            'mdi-check' : 'mdi-close' }}</v-icon>Capital letter
                                    </li>
                                    <li :class="special ? 'text-green-500' : 'text-red-600'"><v-icon size="20">{{
                                        special ?
                                            'mdi-check' : 'mdi-close' }}</v-icon>Special Character
                                    </li>
                                </div>
                                <div class="2 md:px-5">
                                    <li :class="number ? 'text-green-500' : 'text-red-600'"><v-icon size="20">{{ number
                                        ?
                                        'mdi-check'
                                        : 'mdi-close' }}</v-icon>At least one number
                                    </li>
                                    <li :class="minlength ? 'text-green-500' : 'text-red-600'"><v-icon size="20">{{
                                        minlength
                                            ? 'mdi-check' : 'mdi-close' }}</v-icon>Min length 6
                                    </li>
                                </div>
                            </div>
                        </span>
                        <!--Display error message if any-->
                        <p class="bg-red-600 text-white p-1 m-2" v-if="errMsg"><v-icon class="mx-2"
                                size="20">mdi-alert</v-icon>{{ errMsg
                            }}</p>
                        <!--Submit button-->
                        <v-btn @click="" type="submit" max-height="44" min-height="44" variant="flat" color="#ff0050"
                            :elevation="1" :prepend-icon="authenticating ? '' : 'mdi-account-plus'" :ripple="false"
                            class=" w-44 text-lg rounded-md hover:cursor-pointer">
                            <v-progress-circular v-if="authenticating" width="2" size="20" color="darken-blue-4"
                                class="m-1" indeterminate></v-progress-circular>
                            Join now
                        </v-btn>
                        <!--Separator-->
                        <div class="flex justify-center mx-auto w-11/12 md:w-1/3 mt-8">
                            <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                            <p class="text-center my-auto text-xl font-semibold w-16">Or</p>
                            <div class="w-1/2 h-1 my-auto rounded-xl mx-auto bg-zinc-900 opacity-80"></div>
                        </div>
                        <!--login with google-->
                        <div class="md:flex flex-row justify-center text-center mx-auto p-3">
                            <v-btn @click="signInGoogle" min-height="45" min-width="50" class="m-2"
                                color="grey-lighten-2">
                                <v-icon size="30" class="m-1 w-full">
                                    <Google />
                                </v-icon></v-btn>
                            <v-btn @click="signInTwitch" min-height="45" min-width="50" class="m-2"
                                color="purple-darken-2">
                                <v-icon size="30" class="m-1 w-full">mdi-twitch</v-icon></v-btn>
                        </div>

                        <!--separator-->
                        <div class="flex w-fit space-x-5 mx-auto mt-5">
                            <div class=" w-1 h-8 my-auto rounded-xl mx-auto bg-[#00f2ea]">
                            </div>
                            <!--navigate to login page-->
                            <p class="mr-5 my-auto text-center text-xs">Already have an account?</p>
                            <NuxtLink to="/login" onclick=""
                                :class="theme.global.current.value.dark ? 'bg-[#000] text-white hover:bg-[#ff0050]' : 'bg-[#000] text-white hover:bg-[#ff0050]'"
                                class="text-center mx-auto flex w-fit h-fit justify-center m-3 px-6 py-2 rounded-sm hover:cursor-pointer">
                                login</NuxtLink>
                        </div>
                        <NuxtLink to="/" onclick=""
                            :class="theme.global.current.value.dark ? 'text-zinc-400' : 'text-zinc-700'"
                            class="text-center mx-auto flex w-fit h-fit justify-center m-3 px-6 py-2 rounded-md hover:underline hover:cursor-pointer">
                            Help</NuxtLink>

                    </form>
                </div>

                <div
                    class="right w-fit flex mx-auto my-auto p-2 backdrop-blur-md shadow-2xl shadow-black bg-zinc-900 bg-opacity-0 rounded-sm">
                    <v-img src="/racing_flag.webp"
                        :class="theme.global.current.value.dark ? 'bg-inherit ' : 'bg-zinc-700'"
                        class="p-5 mx-auto mb- bg-transparent " width="100" alt="logo"></v-img>
                    <h1 class="ml-2 mr-2 my-auto md:text-6xl text-xl font-black  text-red-600">Chattok </h1>
                    <h1 class="md:text-5xl text-xl my-auto font-semibold"> Gaming</h1>

                </div>
                <!--End of body-->
                <NotificationBar :snackbar="snackbarshow" icon="mdi-check-bold" message="Signed up successfully!"
                    color="green" :timeout="3000" />
            </div>
        </v-img>
    </transition>
</template>
<style>
.tick-list {
    list-style-type: none;
}

.back {
    background-attachment: fixed;
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: cover
}
</style>