import axios from 'axios';

// Replace with your actual API endpoint URL
const JSONUrl = 'https://moryracing.netlify.app/AppSettings.json';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const newLiveId = body.newLiveId;

    try {
        // Fetch the existing JSON file
        const response = await axios.get(JSONUrl);
        let jsonData = response.data;

        // // Update the liveId
        jsonData.liveId = newLiveId;

        // Assuming you have an endpoint to update the JSON file, make a PUT or PATCH request
        const updateResponse = await axios.post(JSONUrl, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { success: true, data: jsonData };
    } catch (error) {
        return { success: false, error: error.message };
    }
});