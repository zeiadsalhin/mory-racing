<template>
    <div>
        <h1>Payment Successful</h1>
        <p>Your payment was successful.</p>
    </div>
</template>

<script setup>
import { useMainStore } from '~/store';
const router = useRouter()
const mainStore = useMainStore();

const sessionId = ref(null);

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
        // mainStore.captureOrder(res)
    }

    setTimeout(() => {
        navigateTo('/stripec')
        // console.log(new Date(1720693943).getTime() / 1000
        // );
    }, 5000);
});
</script>