<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme();
// import Swal from 'sweetalert2'
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const dataview = ref()
const name = ref()
const phone = ref()
const email = ref()
const signin = ref()
const auth = ref()


onMounted(async () => {
    try {
        const { data, error } = await supabase.auth.getSession(); // get session status from local cookies

        if (data.session) {  // access only for users
            dataview.value = true
            console.log('this user is regular')
        } else {
            navigateTo("/login")

        }
    } catch (error) {
        console.log(error);
    }

});
//seo 
useSeoMeta({
    title: 'Chattok Gaming - User Account',
    ogTitle: 'Chattok Gaming - User Account',
    description: 'Welcome to Chattok Gaming',
    ogDescription: 'Welcome to Chattok Gaming',
    ogImage: 'https://mory-racing.netlify.app/mainicon.ico',
    twitterCard: 'summary_large_image',
})

</script>
<template>
    <div>
        <div style="background: url('https://mory-racing.netlify.app/icon.ico');background-size: 10%;">
            <UserAccountdetails />
            <!-- <BottomNav /> -->
        </div>
    </div>
</template>