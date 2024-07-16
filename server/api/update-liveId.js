// utils/api.js

import axios from 'axios';

// Replace with your actual API endpoint URL
const apiUrl = 'https://moryracing.netlify.app/AppSettings.json';

export async function updateLiveId(newLiveId) {
    try {
        const response = await axios.post(apiUrl, { liveId: newLiveId });
        return response.data; // Assuming the API responds with updated data
    } catch (error) {
        console.error('Error updating liveId:', error);
        throw error;
    }
}
