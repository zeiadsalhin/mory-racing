<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme();
const date = new Date().getFullYear()
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>
<template>
    <div class="custom-card transition ease-in-out duration-300 w-full h-5 mb-"
        :class="theme.global.current.value.dark ? 'bg-[#ff0050] ' : 'bg-[#444]'">
    </div>
    <div class="custom-card transition ease-in-out duration-300 w-full h-5"
        :class="theme.global.current.value.dark ? 'bg-[#00f2ea] ' : 'bg-[#444]'">
    </div>
    <div class="custom-card transition ease-in-out duration-300 w-full h-5"
        :class="theme.global.current.value.dark ? 'bg-[#000] ' : 'bg-[#444]'">
    </div>
    <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
        <v-card :tile="true" :flat="true" class="pa-md-10 pa-5 mb-10 text-center" color="black">
            <div class="main md:flex flex-row justify-around p-5">
                <div class="1 p-1">
                    <v-lazy>
                        <NuxtImg quality="100" src="/icon_min2.ico" placeholder="/mainicon.ico" class="p-5 mx-auto"
                            width="200" height="100%" alt="logo" loading="lazy" />
                    </v-lazy>
                </div>
                <div class="2 p-5 flex flex-col items-center md:items-baseline">
                    <p class="text-lg flex justify-start font-weight-bold mt-5 mb-2">Chattok Gaming</p>
                    <nuxtLink :to="b.link" color="surface"
                        class="space-y-2 brightness-75 hover:brightness-100 w-fit flex" v-for="(b, i) in navigation"
                        :key="`navigation${i}`" fab depressed>
                        <p class="text-sm p-1 w-fit">{{ $t(`navigation.${b.name}`) }}</p>
                        <!-- <v-icon>{{ b.icon }}</v-icon> -->
                    </nuxtLink>
                </div>
                <!--<div class="3 flex flex-col text-left p-5">
                <p class="text-md font-weight-bold mt-5 mb-2">Game by</p>
                <a href="https://github.com/OmarFahmy03"
                    class="my-auto brightness-50 hover:brightness-100 transform transition ease-in-out duration-400 mt-3 flex justify-start">
                    <v-icon icon="mdi-github" size="30" class="my-auto"></v-icon>
                    <p class="text-md my-auto ml-2">Mory</p>
                </a>
                <p class="text-md font-weight-bold mt-8 mb-2">Web by</p>
                <a href="https://github.com/zeiadsalhin"
                    class="my-auto brightness-50 hover:brightness-100 transform transition ease-in-out duration-400 mt-3 flex justify-start">
                    <v-icon icon="mdi-github" size="30" class="my-auto"></v-icon>
                    <p class="text-md my-auto ml-2">Alfa</p>
                </a>
            </div>-->
                <div class="3 p-5 flex flex-col text-left items-center">
                    <p class="text-md font-weight-bold mt-5 mb-2">{{ $t('follow') }}</p>
                    <div class="flex justify-center space-x-5a">
                        <a href="https://discord.gg/GywCaY898e" target="_blank"
                            class="my-auto brightness-50 hover:brightness-100 transform transition ease-in-out duration-400 mt-3 px-2 w-fit flex justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                class="bi bi-discord" viewBox="0 0 16 16">
                                <path
                                    d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                        </a>
                        <a href="https://www.tiktok.com/@chattoklive" target="_blank"
                            class="my-auto brightness-50 hover:brightness-100 transform transition ease-in-out duration-400 mt-3 px-2 w-fit flex justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                class="bi bi-tiktok" viewBox="0 0 16 16">
                                <path
                                    d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <!-- <div class="4 p-5 shadow-2xla">
                <p class="text-md mt-5 mb-2">Stay connected</p>
                <h2 class="text-xl font-weight-bold py-2">Alfa Store Ltd</h2>
                <div class="text-center p-2">
                    <v-btn color="surface" class="mr-2" v-for="(b, i) in sm" :key="`sm${i}`" fab depressed>
                        <v-icon>{{ b.icon }}</v-icon>
                    </v-btn>
                </div>
            </div> -->
            </div>
            <br />
            <!-- <br /> -->
            <!-- <div class="h-0.5 w-1/3 mx-auto bg-zinc-800 rounded-full mt-5 mb-5"></div> -->
            <div class=" flex w-fit mx-auto mt-10">
                <p class="opacity-80">©{{ date }} - Chattok Gaming</p>
                <!-- <v-img src="/public/racing_flag.webp" class="mx-2" width="40"></v-img> -->
            </div>
        </v-card>
    </v-locale-provider>

</template>

<script>
export default {
    data() {
        return {
            sm: [
                { icon: "mdi-facebook", link: "#" },
                { icon: "mdi-twitter", link: "#" },
                { icon: "mdi-instagram", link: "#" },
                { icon: "mdi-youtube", link: "#" },
            ],
            navigation: [
                { icon: "", name: "Home", link: "/" },
                { icon: "", name: "About", link: "#about" },
                { icon: "", name: "Offers", link: "#offers" },
                { icon: "", name: "TermsOfService", link: "/TermsOfService" },
                { icon: "", name: "ContactUs", link: "/Contact-US" },
            ],
        };
    },
};
</script>
<style>
/* .custom-card {
    width: 100%;
    position: relative;
    z-index: 9;
    border-top-right-radius: 1000px 0px;
    border-top-left-radius: 8000px 400px;
} */
</style>
