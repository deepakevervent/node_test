import {schema} from "../../controller/auth/gentrateToken";

const j2s = require('joi-to-swagger')

export const sw = { "/auth/genrateToken": { "post": {
    "summary": "Genrate Access Token.",
    "description": "Generate The Access Token by valid user in database.",
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
            "description": "Token Genrated Successfully!"
        },
        "400": {
            "description": "Bad Request!"
        },
        "401": {
            "description": "Incorrect Passowrd! or Invalid EMail Please Check!"
        }
    },
}}}
