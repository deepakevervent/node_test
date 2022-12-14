import * as auth from "./auth";
import * as global from "./global";

import {config} from '../config';

const swagger = {
    openapi: '3.0.0',
    info:{
        title: 'EB REST API',
        version: '1.0.0',
        description: 'EB REST API service',
    },
    'servers': [
        {
            url: config.app.backend_url,
            description: 'Development Server',
        },
        {
            url: config.app.backend_live_url,
            description: 'Live Server'
        }
    ],
    paths: {
        ...auth.sw,
        ...global.sw
    }
}

export default swagger