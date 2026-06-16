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
        // is there data? is the list length greater than 0? if not, return
        if (!Array.isArray(data) || data.length === 0) {
            return data;
        }

        // filter out any placeholder/empty alerts coming from the JSON
        const validAlerts = data.filter((item: Alert) => item && item.message && item.message.toString().trim() !== "");
        if (validAlerts.length === 0) return data;

        alertStore.update(currentAlerts => {
            const next = [...currentAlerts, ...validAlerts];
            // console.log("fetchAlerts - adding valid alerts:", validAlerts, "next store:", next);
            return next;
        });

        // schedule removal only for the alerts we actually added
        validAlerts.forEach((item: Alert) => {
            setTimeout(() => {
                alertStore.update(currentAlerts => {
                    return currentAlerts.filter(alert => alert._id !== item._id)
                })
            }, 3000);
        });
        return data;
    } catch (error) {
        console.error("Failed to read runtime alert JSON file:", error);
    }
}

// Function needs fixed... I spent too much time trying to fix it.
// export function triggerRuntimeAlert(message: string, background = "red", color = "white") {
//     const runtimeAlert: Alert = {
//         _id: `runtime-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//         message,
//         background,
//         color
//     };
//     alertStore.update(currentAlerts => {
//         const next = [...currentAlerts, runtimeAlert];
//         console.log("triggerRuntimeAlert - added:", runtimeAlert, "next store:", next);
//         return next;
//     });

//     setTimeout(() => {
//         alertStore.update(currentAlerts => 
//             currentAlerts.filter(alert => alert._id !== runtimeAlert._id)
//         );
//     }, 3000);
// }