<template>
    <div>
        <input v-model="newLiveId" placeholder="New Live ID">
        <button @click="handleSubmit">Update Live ID</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const newLiveId = ref('11');

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
        } else {
            console.log(`Failed to update Live ID: ${result.error}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};
</script>