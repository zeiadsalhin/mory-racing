<template>
    <div>
        <div class="fixed left-0 top-0 h-full w-full bg-zinc-950">
            <div class="flex justify-center items-center h-full">
                <div class="flex flex-col items-center">
                    <Vue3Lottie animationLink="/Canceled.json" :loop="1" :height="200" :width="200" />
                    <!-- <v-icon icon="mdi-check-circle" color="green" class="m-5" style="font-size: 4rem;"></v-icon> -->
                    <h1 class="p-2 text-xl font-semibold"> {{ $t('ordercancel') }}</h1>
                    <p class="text-sm">{{ $t('ordercancelred') }} {{ countdown }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '~/store';
const router = useRouter()
const mainStore = useMainStore();

const countdown = ref(5);
onMounted(() => {
    const interval = setInterval(() => {
        countdown.value--;
        if (countdown.value === 0) {
            clearInterval(interval);
            navigateTo('/user/account')
        }
    }, 1000);
});
</script>
