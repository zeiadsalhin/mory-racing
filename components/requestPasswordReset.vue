<script setup>
useSeoMeta({
    title: 'Chattok Gaming - Restore access',
    ogTitle: 'Chattok Gaming - Restore Access',
    description: 'Welcome to Chattok Gaming',
    ogDescription: 'Welcome to Chattok Gaming',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})

import { useTheme } from 'vuetify'
const theme = useTheme();
const email = ref()
const errMsg = ref()
const succMsg = ref()

async function resetpassword() { // reset password by email link included token
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
            redirectTo: 'https://mory-racing.netlify.app/login/resetPassword',
        })
        console.log("link sent")
        succMsg.value = 'Link sent Successfully, please check your email' // display user message for success
    } catch (error) {
        console.log(error) // print error message for user
        errMsg.value = error
    }
}
</script>
<template>
    <div>
        <!--form body-->
        <!--renders on all states-->
        <div
            class="about mt-2 p-1 md:Ap-10 am-10 flex-col justify-center mx-auto w-11/12 h-fit shadow-inner rounded-md">
            <div class="title flex flex-col p-5">
                <v-icon class="mx-auto" size="55">mdi-lock-reset</v-icon>
                <h1 class="text-2xl md:text-4xl  text-center font-bold mt-2">Reset Password</h1>
            </div>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-zinc-800"></div>
            <form id="form" class="space-y-5 p-5 h-96 text-center mx-auto justify-center flex-col"
                @submit.prevent="resetpassword">
                <div class="reform mt-3">
                    <p class="text-md md:text-md">To request a password reset link please</p>
                    <label class="p-3 text-md md:text-lg block ">Enter your Email:</label>
                    <v-text-field variant="outlined" color="#00f2ea" placeholder="Enter your registered Email"
                        id="reemail" v-model="email" class=" placeholder:text-sm rounded-md mx-auto w-11/12 "
                        type="email" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
                <!--Confirmation message-->
                <div class="">
                    <p class="text-green-600 mb-2" v-if="succMsg">{{ succMsg }}</p>
                    <v-btn @click="" type="submit" color="#ff0050" class="px-5 py-2 mx-auto rounded-md">
                        {{ succMsg ? 'Sent ' : 'Send login link' }}
                    </v-btn>
                </div>
                <NuxtLink @click="$router.back()"><button type="button"
                        class="mt-5 py-2 opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">Back</button>
                </NuxtLink>
            </form>
        </div>
    </div>
</template>