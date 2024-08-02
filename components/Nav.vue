<script setup>
import { useMainStore } from '@/store';
import { useTheme } from 'vuetify'
const mainStore = useMainStore();
const cartItems = ref([]);
const { locale, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const currentLocale = computed(() => locale.value)
const avatar = ref();
const theme = useTheme();
const Mode = ref(theme.global.name.value);

const toggleTheme = () => {
    theme.global.name.value = Mode.value === 'customDarkTheme' ? 'customLightTheme' : 'customDarkTheme';
    Mode.value = theme.global.name.value;
    localStorage.scheme === 'customLightTheme' ? localStorage.scheme = 'customDarkTheme' : localStorage.scheme = 'customLightTheme';
};
// onNuxtReady(() => {
//     const val = localStorage.getItem('scheme');
//     // Check if 'scheme' is found in localStorage
//     if (val === 'customDarkTheme' || val === 'customLightTheme') {
//         // If found, set the global theme name and Mode value accordingly
//         theme.global.name.value = Mode.value = val;
//     }
// });

// get cart badge
onMounted(() => {
    // const supabase = useSupabaseClient();
    // fetchCartItems(); // Fetch initial cart items
    // getavatar();
    // // Watch for changes in users_cart table
    // const channels = supabase.channel('custom-all-channel')
    //     .on(
    //         'postgres_changes',
    //         { event: '*', schema: 'public', table: 'users_cart' },
    //         () => {
    //             fetchCartItems();
    //         }
    //     )
    //     .subscribe()

    // // Clean up subscription when component is unmounted
    // watch(() => cartItems.value, () => {
    //     return () => {
    //         channels.unsubscribe();
    //     };
    // });
});

// set language 
const change = ((val) => {
    // setLocaleCookie(val);
    // switchLocalePath(val)
    setLocale(val);
    // localStorage.setItem('lang', val)
})

onBeforeMount(() => {
    // localStorage?.getItem('lang') ? setLocale(localStorage.getItem('lang')) : setLocale((navigator.language).slice(0, 2))
    // console.log('User language:', navigator.language);
})
async function fetchCartItems() {
    try {
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
            console.error('Error fetching session:', error.message)
            return
        }
        if (!data) {
            cartItems.value = []
            return
        }
        const id = data.session.user.id

        const { data: cartData, error: cartError } = await supabase
            .from('users_cart')
            .select('cart_items')
            .eq('uid', id)

        if (cartError) {
            console.error('Error fetching cart items:', cartError.message)
            cartItems.value = []
            return
        }
        // Update cartItems.value with fetched cart items or empty array if no data
        cartItems.value = cartData && cartData.length > 0 ? cartData[0].cart_items : []
    } catch (error) {
        // console.error('Error fetching cart items:', error.message)
        cartItems.value = [] // Clear cart items in case of any error
    }
}

// get user avatar
const isUser = ref(true)
async function getavatar() {
    const supabase = useSupabaseClient()
    try {
        const { data, error } = await supabase.auth.getSession(); // get session status from local cookies
        avatar.value = data?.session?.user ? (data.session.user.identities[0] ? data.session.user.identities[0].identity_data.avatar_url : data.session.user.identities[1].identity_data.avatar_url) : null
        // displayname.value = data.session.user.identities[0].identity_data.first_name || data.session.user.identities[0].identity_data.full_name // Display registered username
        // get account type
        // console.log(data.session);

    } catch (error) {
        // console.log(error);
    }
}

// handle log in and log out
const user = useSupabaseUser()
watch(user, () => {
    if (user.value) {
        // fetchCartItems();
        getavatar();
        isUser.value = true
    } else {
        // fetchCartItems();
        getavatar();
        isUser.value = false
    }
}, { immediate: true })
</script>
<template>
    <div>
        <v-app-bar color="surface" :elevation="1" app>
            <nuxt-link to="/">
                <v-toolbar-title class="md:p-4">
                    <!-- <h1 class="font-bold text-xl">Alfa Store</h1> -->
                    <v-img src="/mainicon.ico" :class="theme.global.current.value.dark ? 'bg-inherit ' : 'bg-'"
                        class="m-5" width="50" height="50" alt="logo"></v-img>
                </v-toolbar-title>
            </nuxt-link>
            <div v-if="$vuetify?.display?.mobile" class="flex w-[2.8rem]">
                <v-btn icon name="Chattok TikTok" aria-label="Chattok TikTok"
                    @click="navigateTo('https://www.tiktok.com/@chattoklive', { external: true })"
                    class="mr-2 text-subtitle-2 opacity-85" variant="text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-tiktok m-1" viewBox="0 0 16 16">
                        <path
                            d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                </v-btn>
                <v-btn icon name="Chattok Discord" aria-label="Chattok Discord"
                    @click="navigateTo('https://discord.gg/GywCaY898e', { external: true })"
                    class="mr-2 text-subtitle-2 opacity-85" variant="text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-discord m-1" viewBox="0 0 16 16">
                        <path
                            d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                    </svg>
                </v-btn>
            </div>
            <div v-else>
                <v-btn name="Chattok TikTok" aria-label="Chattok TikTok"
                    @click="navigateTo('https://www.tiktok.com/@chattoklive', { external: true })"
                    class="mr-2 text-subtitle-2 opacity-85" variant="text">
                    {{ $t('follow') }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-tiktok m-1" viewBox="0 0 16 16">
                        <path
                            d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                    </svg>
                </v-btn>
                <v-btn name="Chattok Discord" aria-label="Chattok Discord"
                    @click="navigateTo('https://discord.gg/GywCaY898e', { external: true })"
                    class="mr-2 text-subtitle-2 opacity-85" variant="text">
                    {{ $t('join') }}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                        class="bi bi-discord m-1" viewBox="0 0 16 16">
                        <path
                            d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                    </svg>
                </v-btn>
            </div>
            <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer />
            <v-spacer />
            <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer />
            <v-spacer />
            <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer /> <v-spacer />
            <v-spacer />
            <v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer /><v-spacer />
            <!-- <nuxt-link to="/">
                <v-btn class="mr-md-2" icon>
                    <v-icon size="20">mdi-home-variant</v-icon>
                </v-btn>
            </nuxt-link> -->
            <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="mr-2 text-subtitle-1" variant="text" icon>{{
                        currentLocale.toUpperCase() }}</v-btn>
                </template>
                <v-list :bg-color="theme.global.current.value.dark ? 'grey-darken-4' : ''">
                    <v-list-item> <button @click="change('en')"
                            class="w-full justify-start bg-transparent">English</button>
                    </v-list-item>
                    <v-list-item> <button @click="change('es')"
                            class="w-full justify-start bg-transparent">Espanol</button>
                    </v-list-item>
                    <v-list-item> <button @click="change('ar')"
                            class="w-full justify-start bg-transparent">العربية</button>
                    </v-list-item>
                </v-list>
            </v-menu>
            <nuxt-link :to="isUser ? '/user/account' : '/admin'">
                <v-btn v-if="avatar" class="mr-md-2" icon>
                    <v-avatar size="30"><v-img :src="avatar ? avatar : null"></v-img></v-avatar>
                    <v-tooltip v-if="avatar" activator="parent" location="start">{{ $t('myaccount') }}</v-tooltip>
                </v-btn>
                <v-btn v-else v-if="isUser" class="mr-md-2" icon><v-icon size="30">mdi-account-outline</v-icon>
                </v-btn>
                <v-btn v-if="!isUser" class="mr-2" variant="tonal">{{ $t('login') }}</v-btn>

            </nuxt-link>

            <div>
            </div>
            <!-- <nuxt-link to="/products"><v-btn class="mr-md-2" icon>
                    <v-icon size="20">mdi-store-outline</v-icon>
                </v-btn></nuxt-link> -->
            <!-- <v-badge v-if="cartItems.length > 0" :content="cartItems.length">
                <v-btn nuxt to="/cart" icon>
                    <v-icon size="20">mdi-cart-outline</v-icon>
                </v-btn>
            </v-badge>
            <v-btn v-else nuxt to="/cart" icon>
                <v-icon size="20">mdi-cart-outline</v-icon>
            </v-btn> -->
            <!-- <v-btn v-if="Mode == 'customDarkTheme'" @click="toggleTheme" icon>
                <v-icon size="20">mdi-brightness-2</v-icon>
            </v-btn>
            <v-btn v-else @click="toggleTheme" icon>
                <v-icon size="20">mdi-brightness-7</v-icon>
            </v-btn> -->

            <v-btn v-if="isUser" :to="isUser ? '/user/account#LiveGames' : '/login'" @click="" variant="text"
                :ripple="false" color="#ff0050" class="mr-2 text-h6 font-weight-medium">
                <v-icon size="25" class="mr-">mdi-play</v-icon>
                <p class="text-white">{{ $vuetify?.display?.mobile ? '' : $t('play') }}</p>
            </v-btn>
            <v-spacer />
        </v-app-bar>
    </div>
</template>
<script>
export default {
    methods: {
        toggleTheme2() {
            // localStorage.scheme === 'light' ? localStorage.scheme = 'dark' : localStorage.scheme = 'light';
            // this.$router.go()
            this.theme.global.current.dark ? 'myCustomLightTheme' : 'myCustomdarkTheme';
            this.$vuetify.theme.dark ? console.log('dark') : console.log('light');
        },
    },
};
</script>