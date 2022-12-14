export const sw = { "/global/countries": { "get": {
    "summary": "Get All Countries List",
    "description": "Featching All Countries list.",
    "tags": [
        "global"
    ],
    "requestBody": {
        "content": {
        }
    },
    "responses": {
        "200": {
            "description": "Data Featched Successfully!"
        },
        "500": {
            "description": "Error While Featching Data!"
        }
    },
}}}
