<template>
    <div>
        <input v-model="newLiveId" placeholder="New Live ID">
        <button @click="handleSubmit">Update Live ID</button>
        <p>{{ resultt }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const newLiveId = ref('alfa');
const resultt = ref()
const handleSubmit = async () => {
    try {
        const response = await fetch('/api/update-liveId', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newLiveId: newLiveId.value }),
        });

        const result = await response.json();
        if (result.success) {
            console.log('Live ID updated successfully.' + JSON.stringify(result));
            resultt.value = result
        } else {
            console.log(`Failed to update Live ID: ${result.error}`);
            resultt.value = result.error
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};
</script>