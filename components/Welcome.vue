<script setup>

</script>
<template>
    <div id="about" class="about bg-zinc-95 w-full rounded-sm">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <v-parallax src="/public/racing_line.webp" cover max-height="600" min-height="500"
                    class="aboutme mx-auto lg:px-40 md:py-20 p-5 m-1 rounded-sm"
                    gradient="to right, rgba(255, 0, 80, 0.4), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 242, 234, 0.4)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                    <div class="md:text-3xl text-2xl font-medium md:flex w-fit  md:p-5 p-3">
                        <!-- <v-icon class="mx-3 my-auto" size="35">mdi-information-slab-box-outline</v-icon> -->
                        <h1 class="my-auto text-center w-full min-w-fit mr-5"> Welcome to</h1>
                        <div class="brand flex w-fit">
                            <p class="text-[#ff0050] my-auto inline-block px-2 md:text-4xl text-2xl">
                                Chattok</p>
                            <p class="inline-block text-[#00f2ea] my-auto md:text-4xl text-2xl">Gaming</p>


                            <v-img src="/public/mainicon.ico" width="40" height="40"
                                class="inline-block my-auto w-fit ml-5"></v-img>
                        </div>
                    </div>
                    <p class="md:ml-14 ml-5 py-3 lg:w-2/3 brightness-75 md:text-lg text-md mt-5 leading-snug ">Are you
                        ready
                        to
                        elevate your TikTok presence and engage your audience like never before? At ChatTok Gaming, we
                        offer you the chance to use games on your TikTok live shows to captivate your followers and
                        increase your visibility.
                    </p>

                </v-parallax>
            </transition>
        </v-lazy>
        <div class="2">
            <v-lazy>
                <transition name="fade" mode="out-in">
                    <v-parallax src="/credits.webp" cover height="auto" class="skills md:p-40 p-5"
                        gradient="to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)">
                        <div class="md:text-3xl text-2xl font-medium flex">
                            <v-icon class="mx-3 my-auto" size="30">mdi-gamepad</v-icon>
                            <h1 class="my-auto"> Why Choose ChatTok Gaming?</h1>
                        </div>
                        <p class="md:ml-14 ml-5 py-3 lg:w-2/3 brightness-75 md:text-lg text-md mt-5 leading-snug ">Our
                            unique TikTok live games are designed to provide an interactive and entertaining experience
                            for your audience. Whether you're looking to boost engagement, grow your follower base, make
                            extra money, or simply have fun, our games are the perfect solution.
                        </p>
                    </v-parallax>
                </transition>
            </v-lazy>
        </div>
    </div>
</template>