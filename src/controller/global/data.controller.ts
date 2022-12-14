import express from 'express';
import * as helper from '../../helper';
import { CountriesService, StatesServices, CitiesServices } from '../../services';
import * as Message from '../../utils/constants/global.constants';

export const schema = () => {
    const joi = require('joi');
    return joi.object().keys({
        id: joi.number().messages({
            'number.base': Message.DATATYPE_SHOULD_BE_NUMBER,
        }),
    });
}

export const getCountriesAction = async(req: express.Request, res: express.Response)=>{

    const criteria = {};
    const projection = {
        name: 1,
        id: 1,
        _id: 0
    };

    CountriesService.getCountriesData(criteria, projection, {lean: true}, (err, data)=>{
        if(err) return helper.generateErr(res ,Message.ERROR_WHILE_FEATCHING_DATA, 500);
        helper.generateSucc(res, Message.DATA_FEATCHED, data);
    })
}

export const getStatesAction = async(req: express.Request, res: express.Response)=>{
    const {id} = req.body;
    const criteria = {
        country_id: id
    };
    const projection = {
        name : 1,
        country_code : 1,
        state_code : 1,
        latitude : 1,
        longitude: 1,
        id: 1,
        _id: 0
    };

    if(helper.validateRequest(schema(), req.body, res)) return;

    StatesServices.getStatesData(criteria, projection, {lean:true},(err, data)=>{
        if(err) return helper.generateErr(res ,Message.ERROR_WHILE_FEATCHING_DATA, 500);
        helper.generateSucc(res, Message.DATA_FEATCHED, data);
    })
}

export const getCitiesAction = async(req: express.Request, res: express.Response)=>{
    const {id} = req.body;
    const criteria = {
        state_id: id
    };
    const projection = {
        name : 1,
        country_id : 1,
        country_code : 1,
        state_code : 1,
        latitude : 1,
        longitude: 1,
        id: 1,
        _id: 0
    };

    if(helper.validateRequest(schema(), req.body, res)) return;

    CitiesServices.getCitiesData(criteria, projection, {lean:true},(err, data)=>{
        if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_DATA, 500);
        helper.generateSucc(res, Message.DATA_FEATCHED, data);
    })
}