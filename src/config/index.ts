import dotenv from "dotenv";
dotenv.config();

export const config  = {
    app: {
        frontend_url: process.env.FRONTEND_URL || 'http://localhost',
        backend_url: process.env.BACKEND_URL || 'http://localhost/api/',
        swagger_url: process.env.SWAGGER_URL || 'http://localhost/api-docs',
        backend_live_url: process.env.BACKEND_LIVE_URL || 'http://localhost/api/',
        api_testing: process.env.API_TESTING || false
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET || 'saafghiuhbnbkjkhh',
        jwt_expire_in: '1hr',
    },
    http: {
        port: process.env.PORT || 8080,
    },
    db: {
        connect_string: process.env.DB_URI || null,
    },
}

