import {schema} from "../../controller/auth/login";

const j2s = require('joi-to-swagger')

export const sw = { "/auth/login": { "post": {
    "summary": "Login the client",
    "description": "Login the client by required access key with username and password.",
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
            "description": " Sucessfully Logged In!"
        },
        "400": {
            "description": "Bad Request!"
        },
        "401": {
            "description": "Validation Errors!"
        },
        "500": {
            "description": "Internal Errors!"
        }
    },
}}}
