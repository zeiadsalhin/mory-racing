<template>
    <div>
        <h1>Payment Successful</h1>
        <p>Your payment was successful. Your session ID is: {{ sessionId }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sessionId = ref(null);

onMounted(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    sessionId.value = urlParams.get('session_id');

    if (sessionId.value) {
        await fetch('/api/record-invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sessionId: sessionId.value }),
        });
    }
});
</script>