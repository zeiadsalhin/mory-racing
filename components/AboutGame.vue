<script setup>
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)
</script>
<template>
    <div id="about" class="about bg-zinc-950 w-full rounded-sm" data-aos="fade-up" data-aos-duration="500">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                    <v-img src="/public/intro.gif" cover class="aboutme mx-auto h-[60rem] md:p-40 p-5 m-1 rounded-sm"
                        gradient="to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                        <div class="md:text-3xl text-2xl font-bold flex md:ml-[0.4rem] justify-center text-center mx-auto items-center  mt-5"
                            data-aos="fade-up" data-aos-duration="500">
                            <v-icon class="mx-3a my-auto" size="35">mdi-information-slab-box-outline</v-icon>
                            <h1 class="my-auto text-center px-3"> {{ $t('aboutchattok') }}</h1>
                        </div>
                        <p
                            class="md:ml-16a ml-4a py-3 md:w-2/3 text-centerA mx-auto brightness-75 md:text-lg text-md mt-5 leading-snug ">
                            {{
                                $t('aboutchattokdesc1') }}
                        </p>
                        <p
                            class="md:ml-16a ml-4a py-3 md:w-2/3 text-centerA mx-auto brightness-75  md:text-lg text-md mt-1 leading-snug ">
                            {{
                                $t('aboutchattokdesc2') }}
                        </p>
                    </v-img>
                </v-locale-provider>
            </transition>
        </v-lazy>
        <!-- <div class="2">
            <v-lazy>
                <transition name="fade" mode="out-in">
                    <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
                        <v-img src="/credits.webp" cover height="auto" class="skills md:p-40 p-5"
                            gradient="to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                            <div class="md:text-2xl  text-xl font-medium flex" data-aos="fade-up"
                                data-aos-duration="500">
                                <v-icon class="mx-3 my-auto" size="30">mdi-copyright</v-icon>
                                <h1 class="my-auto"> {{ $t('credits') }}</h1>
                            </div>
                            <ul class="mt-5 space-y-5a md:text-2xl text-sm list-[square] p-3 ml-2" data-aos="fade-up"
                                data-aos-duration="500">
                                <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                            src="/mainicon.ico"></v-img></v-avatar>
                                    <p class="ml-3 mr-3 my-auto">Mory</p>
                                    <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                    <p class="md:text-[1.2rem] my-auto brightness-75">{{ $t('chattokdev') }}</p>
                                </li>
                                <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"{{ $t('chattokdevdesc') }}."
                                </p>
                                <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                            src="/b.webp"></v-img></v-avatar>
                                    <p class="ml-3 mr-3 my-auto">Alfa</p>
                                    <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                    <p class="md:text-[1.2rem] my-auto brightness-75">{{ $t('chattokwebdev') }}</p>
                                </li>
                                <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"{{ $t('chattokwebdevdesc')
                                    }}."
                                </p>
                                <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                            src="/mainicon.ico"></v-img></v-avatar>
                                    <p class="ml-3 mr-3 my-auto">Clinton Deig</p>
                                    <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                    <p class="md:text-[1.2rem] my-auto brightness-75">{{ $t('chattokowner') }}</p>
                                </li>
                                <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"{{ $t('chattokownerdesc')
                                    }}."
                                </p>
                                <li class="flex mb-2"><v-avatar size="30"><v-img alt="Mory"
                                            src="/mainicon.ico"></v-img></v-avatar>
                                    <p class="ml-3 mr-3 my-auto">Jose</p>
                                    <div class="w-5 h-0.5 bg-zinc-800 my-auto ml-4 mr-1"></div>
                                    <p class="md:text-[1.2rem] my-auto brightness-75">{{ $t('chattokbackend') }}</p>
                                </li>
                                <p class="text-sm font-thin italic ml-5 mb-10 opacity-80">"{{ $t('chattokbackenddesc')
                                    }}"
                                </p>
                                <li>Project Management</li> -->
        <!--  </ul>
                        </v-img>
                    </v-locale-provider>
                </transition>
            </v-lazy>
        </div> -->
    </div>
</template>