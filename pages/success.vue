<template>
    <div>
        <div class="fixed left-0 top-0 h-full w-full bg-zinc-950">
            <div class="flex justify-center items-center h-full">
                <div class="flex flex-col items-center">
                    <Vue3Lottie animationLink="/completed.json" :loop="1" :height="200" :width="200" />
                    <!-- <v-icon icon="mdi-check-circle" color="green" class="m-5" style="font-size: 4rem;"></v-icon> -->
                    <h1 class="p-2 text-xl font-semibold">{{ $t('ordercomplete') }}</h1>
                    <p class="p-2">{{ $t('ordercompleteconfirm') }}</p>
                    <p class="text-sm">{{ $t('ordercancelred') }} {{ countdown }}</p>
                    <p class="text-xs p-1">{{ $t('ordercompletewarning') }}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '~/store';
const router = useRouter()
const mainStore = useMainStore();

const sessionId = ref(null);
const resInvoice = ref(null);
onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    sessionId.value = urlParams.get('session_id');

    if (sessionId.value) {
        const response = await fetch('/api/record-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionId.value }),
        });
        const res = await response.json();
        console.log(res);
        resInvoice.value = res
        mainStore.captureOrder(res)
        await updatestripeuser();
    }
});


// set stripe customer ID
const countdown = ref(5);
const updatestripeuser = async () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    try {
        const { data, error } = await supabase.auth.updateUser({
            data: { stripe_cus_id: resInvoice.value.subs_details.customer_id, stripe_subs_id: resInvoice.value.subs_details.subs_id }
        })
        if (error) {
            console.log(error);
        } else {
            console.log('Stripe_id Set successfully');
            const interval = setInterval(() => {
                countdown.value--;
                if (countdown.value === 0) {
                    clearInterval(interval);
                    navigateTo('/user/account')
                }
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
}
</script>
