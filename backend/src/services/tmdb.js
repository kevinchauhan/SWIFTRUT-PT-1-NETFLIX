import fetch from 'node-fetch';
import { Config } from '../config/index.js';

export async function fetchFromTMDB(url) {
    try {
        const apiKey = Config.TMDB_API_KEY;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error fetching data from TMDb: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in fetchFromTMDB:", error.message);
        throw error; // Re-throw the error to be caught by the controller
    }
}
