import {schema} from "../../controller/global/data.controller";

const j2s = require('joi-to-swagger');

export const sw = { "/global/states": { "get": {
    "summary": "Get States",
    "description": "Featching States by Country Id.",
    "tags": [
        "global"
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
            "description": "Data Featched Successfully!"
        },
        "400": {
            "description": "Bad Request!"
        },
        "500": {
            "description": "Error While Featching Data!"
        }
    },
}}}