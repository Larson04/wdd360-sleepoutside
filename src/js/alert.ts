// import alert interface from types.mts
import type { Alert } from "./types.mts";
import { writable } from "svelte/store";

export const alertStore = writable<Alert[]>([]);

export  async function fetchAlerts() {
    try {
        const response = await fetch('/json/alerts.json');
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if(!data || data === null) {
            throw new Error(`Data is undefined or null`);
        }
        // is there data? is the list length greater than 0? if not, throw an error
        if (Array.isArray(data) && data.length === 0) {
            alertStore.set([]);
            return data;
        }
        alertStore.set(data);
        return data;
    } catch (error) {
        console.error("Failed to read runtime alert JSON file:", error);
    }
}
