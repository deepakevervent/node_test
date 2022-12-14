import express from 'express';
import * as global  from '../../controller/global';

const dataRouter = express.Router();

dataRouter.get('/countries', global.data.getCountriesAction);
dataRouter.get('/states', global.data.getStatesAction);
dataRouter.get('/cities', global.data.getCitiesAction);
dataRouter.get('/validate_pincode', global.pin.getValidatePinAction);

export {dataRouter}