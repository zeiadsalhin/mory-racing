import axios from 'axios';

// Replace with your actual API endpoint URL
const JSONUrl = 'https://getpantry.cloud/apiv1/pantry/4b01c2d5-7411-4ab5-a531-9c214a1ae346/basket/webusers';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const newLiveId = body.newLiveId;

    try {
        // Fetch the existing JSON file
        let jsonData =
        {
            "liveId": body.liveId,
            "tuts": false,
            "debugLogs": false,
            "localDebug": false,
            "server": {
                "prod": "wss://app-tiktoklive-dev-use-001.azurewebsites.net/MyHub",
                "local": "ws://localhost:5000/MyHub",
                "active": "prod"
            },
            "game": {
                "boosterAmmountMax": 10,
                "speedMax": 10,
                "accelerationMax": 5,
                "brakeMax": 10,
                "minSpeed": 10,
                "giftIncrement": 1,
                "likeIncrement": 0.1,
                "secondsToStartRace": 5,
                "resetTimerOnPlayerJoin": false
            }
        };

        // // Assuming you have an endpoint to update the JSON file, make a PUT or PATCH request
        const updateResponse = await axios.post(JSONUrl, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { success: true, data: jsonData.liveId };
    } catch (error) {
        return { success: false, error: error.message };
    }
});