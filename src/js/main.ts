import { openUserMenu } from "./utils.mjs";
import auth from "./auth.svelte.ts";

openUserMenu(".user__button");

auth.checkAuth()