<script setup>
useSeoMeta({
    title: 'Chattok Gaming - oneClick Login',
    ogTitle: 'Chattok Gaming - oneClick Login',
    description: 'Welcome to Chattok Gaming',
    ogDescription: 'Welcome to Chattok Gaming',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})

import { useTheme } from 'vuetify'
const theme = useTheme();
const router = useRouter()
const email = ref()
const errMsg = ref()
const succMsg = ref()
const countdown = ref(60);

async function oneClickLogin() { // login by email link included token
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: 'https://mory-racing.netlify.app/user/',
                shouldCreateUser: false
            }
        })
        if (error) {
            errMsg.value = 'No account Found with this Email'
        } else {
            errMsg.value = ''
            console.log("link sent")
            succMsg.value = 'Link sent Successfully, please check your email' // display user message for success
            const interval = setInterval(() => {
                countdown.value--;
                if (countdown.value === 0) {
                    clearInterval(interval);
                    succMsg.value = null
                    countdown.value = 60
                }
            }, 1000);
        }
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
            class="about mta-20 p-1 md:ap-10 am-10 flex-co   l justify-center mx-auto w-11/12 h-fit shadow-inner rounded-md">
            <div class="title flex flex-col p-5">
                <v-icon class="mx-auto" size="55">mdi-fingerprint</v-icon>
                <h1 class="text-2xl md:text-4xl  text-center font-bold mt-2">{{ $t('oneclick') }}</h1>
            </div>

            <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-zinc-800"></div>
            <form id="ocform" class="space-y-5 p-5 h-96 text-center mx-auto justify-center flex-col"
                @submit.prevent="oneClickLogin">
                <div class="form mt-3">
                    <p class="text-md md:text-md">{{ $t('oneclickreq') }}</p>
                    <label class="p-3 text-sm md:text-lg block ">{{ $t('oneclickreqemail') }}:</label>
                    <v-text-field variant="outlined" color="#00f2ea" :placeholder="$t('oneclicklabel')" id="ocemail"
                        v-model="email" :class="theme.global.current.value.dark ? '' : ''"
                        class=" placeholder:text-sm rounded-md mx-auto w-11/12 " type="email" required />
                </div>
                <!--Display error message if any-->
                <p class="text-red-500" v-if="errMsg">{{ errMsg }}</p>
                <!--Confirmation message-->
                <div class="">
                    <p class="text-green-600 mb-2" v-if="succMsg">{{ succMsg }}</p>
                    <v-btn @click="" type="submit" color="#ff0050"
                        :class="theme.global.current.value.dark ? 'bg-[#ff0050] text-white' : ' text-white'"
                        class="px-5 py-2 mx-auto rounded-md hover:cursor-pointer ">
                        {{ succMsg ? $t('oneclickwait') + countdown : $t('oneclicksend') }}
                    </v-btn>
                </div>
                <NuxtLink @click="$router.back()"><button type="button"
                        class="mt-5 py-2 opacity-70 w-fit hover:cursor-pointer amx-auto bloack underline">
                        {{ $t('back') }}
                    </button></NuxtLink>
            </form>
        </div>
    </div>
</template>