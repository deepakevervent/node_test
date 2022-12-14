import {schema} from "../../controller/auth/register";

const j2s = require('joi-to-swagger')

export const sw = { "/auth/register": { "post": {
    "summary": "Register The client",
    "description": "Register The client to the company data base so comapany can genrate access token to the client.",
    "tags": [
        "auth"
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": { ...j2s(schema()).swagger }
            }
        }
    },
    "responses": {
        "200": {
            "description": "Signup Sucessfully Done!"
        },
        "400": {
            "description": "Bad Request!"
        },
        "401": {
            "description": "This Email is Alreday Registered!"
        },
        "500": {
            "description": "Signup Failed Internal Error!"
        }
    },
}}}
