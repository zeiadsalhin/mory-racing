<template>
    <div>
        <input v-model="newLiveId" placeholder="New Live ID">
        <button @click="handleSubmit">Update Live ID</button>
    </div>
</template>

<script setup>
import axios from 'axios';

const apiUrl = 'https://moryracing.netlify.app/AppSettings.json'; // Replace with your actual API endpoint URL

let newLiveId = '11';

async function handleSubmit() {
    try {
        const response = await axios.post(apiUrl, { liveId: newLiveId });
        alert('Live ID updated successfully!');
        // Optionally, you can fetch updated data and update your component state
    } catch (error) {
        alert('Failed to update Live ID. Please try again later.');
        console.error('Error:', error);
    }
}
</script>