import * as genrateToken from "./gentrateToken";
import * as register from "./register";
import * as login from "./login";

export const sw = { ...genrateToken.sw, ...register.sw , ...login.sw}