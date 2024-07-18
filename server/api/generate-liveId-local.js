import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const jsonData = {
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

    try {
        const filePath = path.resolve('public', 'AppSettings.json');
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

        return { success: true, data: jsonData };
    } catch (error) {
        return { success: false, error: error.message };
    }
});