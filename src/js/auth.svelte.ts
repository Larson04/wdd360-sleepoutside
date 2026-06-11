import type {UserStore} from "./types.mts";
import { getLocalStorage, setLocalStorage } from "./utils.mts";
const baseURL = import.meta.env.PUBLIC_SERVER_URL;


const userStore = $state({isLoggedIn: false, user: {}, token: ""}) as UserStore;

async function login(email, password){
    const response = await fetch(`${baseURL}login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password})
    })
    const data = await response.json();
    if(response.ok){
        userStore.isLoggedIn = true;
        userStore.user = data.user;
        userStore.token = data.token;
        setLocalStorage("so-user", userStore);
        return data;
    } else {
        throw new Error(data.error.message);
    }
}

function logout(){
    userStore.isLoggedIn = false;
    userStore.user = undefined;
    userStore.token = "";
    setLocalStorage("so-user", null);
}

function checkAuth(){

    const userData = getLocalStorage("so-user");
    if (userData){
        userStore.isLoggedIn = true;
        userStore.user = userData.user;
        userStore.token = userData.token;
    } else {
        userStore.isLoggedIn = false;
        userStore.user = undefined;
        userStore.token = "";
    }

    return !!userData;

}

export default { userStore, login, logout, checkAuth };