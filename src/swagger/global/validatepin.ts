import {schema} from "../../controller/global/validate.pin";

const j2s = require('joi-to-swagger');

export const sw = { "/global/validate_pincode": { "get": {
    "summary": "Get Postal Code Validate",
    "description": "To check whether postal code is valid or not.",
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