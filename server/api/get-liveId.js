import axios from 'axios';

// Replace with your actual API endpoint URL
const JSONUrl = 'https://getpantry.cloud/apiv1/pantry/4b01c2d5-7411-4ab5-a531-9c214a1ae346/basket/webusers';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const newLiveId = '';

    try {
        // Fetch the existing JSON file
        const response = await axios.get(JSONUrl);
        let jsonData = response.data;

        // // Update the liveId
        // jsonData.liveId = newLiveId;

        // // Assuming you have an endpoint to update the JSON file, make a PUT or PATCH request
        // const updateResponse = await axios.put(JSONUrl, jsonData, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        return { success: true, data: jsonData.liveId };
    } catch (error) {
        return { success: false, error: error.message };
    }
});