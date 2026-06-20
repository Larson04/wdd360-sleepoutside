import { convertToJson } from "./productData.mts";

const baseURL = import.meta.env.PUBLIC_SERVER_URL;


export async function getNewsletterSignups() {
    return await fetch(baseURL + `newsletter/`)
    .then(convertToJson)
    .then((data) => data);
}