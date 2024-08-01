<script setup>

</script>
<template>
    <div id="about" class="about">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <v-parallax src="" cover max-height="auto" min-height="500" height="auto"
                    class="aboutme mx-auto lg:px-40 md:py-20 p-5 m-1 rounded-sm  mt-10"
                    gradient="to right, rgba(255, 0, 80, 0.4), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 242, 234, 0.4)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                    <div class="md:text-3xl text-2xl font-medium flex w-fit md:p-5 p-3">
                        <v-icon class="mx-3 my-auto" size="35">mdi-sitemap</v-icon>
                        <h1 class="my-auto text-center w-full min-w-fit mr-5 font-semibold brightness-200 "> {{
                            $t('workchattok') }}</h1>
                    </div>
                    <div
                        class="md:ml-14 py-3 space-y-5 lg:w-2/3 brightness-90 md:text-lg text-sm mt-5 min-w-fit leading-snug ">
                        <ol class="space-y-5 text-md list-decimal p-3 md:ml-10 ml-3">
                            <li>
                                <p class="font-semibold inline-block m-1">{{
                                    $t('workchattokplan1') }}:</p>
                                {{ $t('workchattokplan1desc') }}
                            </li>
                            <li>
                                <p class="font-semibold inline-block m-1">{{ $t('workchattokplan2') }}:</p>
                                {{ $t('workchattokplan2desc') }}.
                            </li>

                        </ol>
                    </div>

                </v-parallax>
            </transition>
        </v-lazy>
        <div class="2">
            <v-lazy>
                <transition name="fade" mode="out-in">
                    <v-parallax src="/mainicon.ico" placeholder="/mainicon.ico" cover
                        class="skills md:p-40 p-5 md:h-[50rem] md:max-h-[50rem]"
                        gradient="to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                        <div class="md:text-2xl text-md flex font-bold mt-5">
                            <v-icon class="mx-3 my-auto" size="30">mdi-cash</v-icon>
                            <h1 class="my-auto">{{ $t('makemoneychattok') }}</h1>
                        </div>
                        <p class="md:ml-10 ml-5 py-3 lg:w-2/3 brightness-90 md:text-lg text-sm  mt-3 leading-snug ">
                            {{ $t('makemoneychattokdesc') }}:
                        </p>
                        <div
                            class="md:ml-14 ml-5 py-3 space-y-5 lg:w-2/3 brightness-90 md:text-lg text-md mt-5 leading-snug ">
                            <ol class="space-y-5 text-md list-decimal p-3 md:ml-10 ml-3">
                                <li>
                                    <p class="font-semibold inline-block m-1">{{ $t('makemoneychattok1') }}:</p>
                                    {{ $t('makemoneychattok1desc') }}
                                </li>
                                <li>
                                    <p class="font-semibold inline-block m-1">{{ $t('makemoneychattok2') }}:</p>
                                    {{ $t('makemoneychattok2desc') }}.
                                </li>

                            </ol>
                        </div>
                    </v-parallax>
                </transition>
            </v-lazy>
        </div>
    </div>
</template>