<template>
    <div>
        <h1>Payment Successful</h1>
        <p>Your payment was successful.</p>
        <p>Redirecting in {{ countdown }}</p>
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
            data: { stripe_cus_id: resInvoice.value.subs_details.customer_id }
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
