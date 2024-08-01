<template>
    <div>
        <transition name="fade">
            <div v-if="loading" class="fixed left-0 top-0 h-full w-full bg-zinc-950">
                <div class="flex justify-center items-center h-full">
                    <div class="flex flex-col items-center">
                        <div>
                            <NuxtImg quality="80" src="/mainicon.ico" alt="ChattokLogo" placeholder="/mainicon.ico"
                                class="w-48 animate-pulsea text-zinc-300" width="100%" height="100%" />
                        </div>
                        <!-- <div class="mt-4">
                            <h1 class="text-3xl font-semibold p-2 text-center animate-pulse text-zinc-300">Mory Racing
                            </h1>
                        </div> -->
                    </div>
                </div>

            </div>
        </transition>
    </div>
</template>

<script setup>
const loading = ref(true);
setTimeout(() => {
    // loading.value = false
}, 1500);
onNuxtReady(() => {
    loading.value = false
})
</script>
<style>
.fixed {
    z-index: 9999999;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
