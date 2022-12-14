import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerDefs from '../src/swagger/def';
import {config} from './config';
import * as routers from './routes';
import { dbConnect } from './Lib/mongo';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(helmet())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDefs))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

dbConnect();

app.get("/health", (req: express.Request, res: express.Response)=>{
    res.status(200).json({
        message: "Server is Up And running...",
    })
})

const mainRouter = express.Router();
mainRouter.use("/auth", routers.authRouter);
mainRouter.use("/global", routers.dataRouter);
mainRouter.use("/broker", routers.broker);

app.use('/api', mainRouter);

app.listen(config.http.port, () => console.log(`server running on http://localhost:${config.http.port}\nswagger is running on ${config.app.swagger_url}`));
