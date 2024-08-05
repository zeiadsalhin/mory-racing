<script setup>
const chattokimgs = [
    { name: "1", src: "/1.webp" },
    { name: "2", src: "/2.webp" },
    { name: "3", src: "/3.webp" },
    { name: "4", src: "/4.webp" },
    { name: "5", src: "/5.webp" },
    { name: "6", src: "/6.webp" },
    { name: "7", src: "/7.webp" },
    { name: "8", src: "/8.webp" },
    { name: "9", src: "/9.webp" },
]

const chattokvids = [
    { name: "1", src: "/first.mp4" },
    { name: "2", src: "/se.mp4" },
    { name: "3", src: "/t.mp4" },
    { name: "4", src: "/ge.mp4" },
    { name: "5", src: "/fifth.mp4" },
]
</script>
<template>
    <div>
        <div class="main flex flex-col w-full justify-center items-center p-5">
            <div class="title p-5">
                <h2 class="text-2xl font-semibold">{{ $t('proofpage') }}</h2>
            </div>
            <!--img genrator-->
            <div class="flex flex-wrap mx-auto justify-center w-full gap-4">
                <div v-for="(img, index) in chattokimgs" :key="index">
                    <transition name="fade" mode="out-in">
                        <v-lazy>
                            <v-img :src="img.src" class="md:w-[28rem] w-[20rem] rounded-sm"></v-img>
                        </v-lazy>
                    </transition>
                </div>
            </div>
            <!--vid genrator-->
            <!--<div class="flex flex-wrap mx-auto justify-center w-full gap-4 m-5">
                <div v-for="(v, index) in chattokvids" :key="index">
                    <video id="my-video" class="video-js md:w-[16rem] w-[9rem] p-2 rounded-xl" controlsa autoplay="true"
                        width="100%" playsinline muted loop="true" height="100%" data-poster="/mainicon.ico"
                        data-setup="{}" v-lazy-load>
                        <source :src="v.src" type="video/mp4" />
                        <p class="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a
                            web browser that
                            <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5
                                video</a>
                        </p>
                    </video>
                </div>
            </div>-->
        </div>
    </div>
</template>
