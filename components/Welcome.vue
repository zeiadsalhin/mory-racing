<script setup>
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>
<template>
    <div id="about" class="about bg-zinc-95 w-full rounded-sm min-h-[50rem]">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                    <v-parallax src="/racing_line.webp" placeholder="/mainicon.ico" alt="carrace" cover max-height="600"
                        min-height="500" class="aboutme mx-auto lg:px-40 md:py-20 p-5 m-1 rounded-sm"
                        gradient="to right, rgba(255, 0, 80, 0.4), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 242, 234, 0.4)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">

                        <div class="md:text-3xl text-2xl font-medium md:flex w-fit  md:p-5 p-3" data-aos="fade-up"
                            data-aos-duration="500">
                            <!-- <v-icon class="mx-3 my-auto" size="35">mdi-information-slab-box-outline</v-icon> -->
                            <h1 class="my-auto text-center flex w-full min-w-fit mr-"> {{ $t('welcomechattok') }}</h1>
                            <div class="brand flex w-fit">
                                <p class="text-[#ff0050] my-auto inline-block px-2 md:text-4xl text-2xl">
                                    Chattok</p>
                                <p class="inline-block text-[#00f2ea] my-auto md:text-4xl text-2xl">Gaming</p>


                                <v-img src="/public/mainicon.ico" alt="chattokicon" width="40" height="40"
                                    class="inline-block my-auto w-fit ml-5 mr-5"></v-img>
                            </div>
                        </div>
                        <p class="md:ml-14 ml-5 py-3 lg:w-2/3 brightness-75 md:text-lg text-md mt-5 leading-snug ">{{
                            $t('welcomechattokdesc') }}
                        </p>

                    </v-parallax>
                </v-locale-provider>
            </transition>
        </v-lazy>
        <div class="team">

            <transition name="fade" mode="out-in">
                <v-lazy>
                    <v-parallax src="/ffflux.svg" class="xl:h-[62rem]" width="100%" cover>
                        <div class="xl:p-40 p-5 max-w-fit min-w-fit mx-auto items-center d-flex fill-height">
                            <div class="main">
                                <h2 class="text-3xl font-semibold py-5 my-auto" data-aos="fade-up"
                                    data-aos-duration="500">
                                    <v-icon class="md:mx-3 my-auto mb-2" size="35">mdi-account-group</v-icon>
                                    Meet Our
                                    team
                                </h2>
                                <div
                                    class="images md:flex flex-wrap gap-4 w-full mx-auto backdrop-brightness-110 backdrop-blur-axl shadow-sm rounded-md justify-around md:space-x-3 md:space-y-0 space-y-10 md:ml-3 p-10">
                                    <div class="1 flex flex-col items-center">
                                        <v-lazy>
                                            <v-img src="/Clinton.webp"
                                                class="md:w-[16rem] max-w-[16rem] min-w-[16rem] h-[16rem] min-h-[16rem] max-h-[16rem] rounded-md transition-all ease-in-out hover:-translate-y-2"
                                                cover></v-img></v-lazy>
                                        <h2 class="text-xl p-1 font-semibold">Clinton Deig</h2>
                                        <p class="px-1 opacity-80">Chattok Gaming Founder</p>
                                    </div>
                                    <div class="2 flex flex-col items-center">
                                        <v-lazy>
                                            <v-img src="/Jose.webp"
                                                class="md:w-[16rem] max-w-[16rem] min-w-[16rem] h-[16rem] min-h-[16rem] max-h-[16rem] rounded-md transition-all ease-in-out hover:-translate-y-2"
                                                cover></v-img></v-lazy>
                                        <h2 class="text-xl p-1 font-semibold">Jose Vivas</h2>
                                        <p class="px-1 opacity-80">Chattok Gaming Backdoor</p>
                                    </div>
                                    <div class="3 flex flex-col items-center">
                                        <v-lazy>
                                            <v-img src="/Mory.webp"
                                                class="md:w-[16rem] max-w-[16rem] min-w-[16rem] h-[16rem] min-h-[16rem] max-h-[16rem] rounded-md transition-all ease-in-out hover:-translate-y-2"
                                                cover></v-img></v-lazy>
                                        <h2 class="text-xl p-1 font-semibold">Mory</h2>
                                        <p class="px-1 opacity-80">Chattok Gaming Developer</p>
                                    </div>
                                    <div class="4 flex flex-col items-center">
                                        <v-lazy>
                                            <v-img src="/Alfa.webp"
                                                class="md:w-[16rem] max-w-[16rem] min-w-[16rem] h-[16rem] min-h-[16rem] max-h-[16rem] rounded-md transition-all ease-in-out hover:-translate-y-2"
                                                cover></v-img></v-lazy>
                                        <h2 class="text-xl p-1 font-semibold">Alfa</h2>
                                        <p class="px-1 opacity-80">Chattok Gaming Web Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-parallax>
                </v-lazy>
            </transition>
        </div>
        <div class="2">
            <v-lazy>
                <transition name="fade" mode="out-in">
                    <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                        <v-parallax src="/mainicon.ico" placeholder="/mainicon.ico" alt="chattokLogo" cover
                            class="skills md:p-40 p-5 md:h-[50rem] md:max-h-[50rem]"
                            gradient="to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                            <div class="md:text-3xl text-2xl font-bold flex md:ml-[0.4rem]" data-aos="fade-up"
                                data-aos-duration="500">
                                <v-icon class="mx-3 my-auto" size="30">mdi-gamepad</v-icon>
                                <h1 class="my-auto"> {{ $t('choosechattok') }}</h1>
                            </div>
                            <p
                                class="md:ml-[4rem] ml-5 py-3 lg:w-2/3 brightness-75 md:text-lg text-md mt-5 leading-snug ">
                                {{
                                    $t('choosechattokdesc') }}
                            </p>
                        </v-parallax>
                    </v-locale-provider>
                </transition>
            </v-lazy>
        </div>
    </div>
</template>