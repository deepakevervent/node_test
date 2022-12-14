import express from 'express';
import * as helper from '../../helper';
import * as Message from '../../utils/constants/global.constants';
import * as postalcodeservices  from '../../services/PostalCodeServices'; 

export const schema = () => {
    const joi = require('joi');
    const validationMessages = {
        'string.base': Message.DATATYPE_SHOULD_BE_STRING,
        'any.required': Message.REQUIRED,
        'string.empty': Message.DATA_SHOULD_NOT_TO_BE_EMPTY
    }

    return joi.object().keys({
        state: joi.string().required().messages(validationMessages),
        country_code: joi.string().required().messages(validationMessages),
        postal_code: joi.string().required().messages(validationMessages),
    });
}

export const getValidatePinAction = async(req: express.Request, res: express.Response)=>{
    const {state, country_code, postal_code} = req.body;
    const criteria = {
        STATE: state,
        COUNTRY: country_code, 
        POSTAL_CODE: postal_code 
    };

    const projection = {
        COUNTRY: 1,
        POSTAL_CODE: 1,
        CITY: 1,
        STATE: 1,
        COUNTY: 1,
        _id: 0
    };

    if(helper.validateRequest(schema(), req.body, res)) return;

    postalcodeservices.getPostalData(criteria, projection, {lean:true},(err, data)=>{
        if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_DATA, 500);
        helper.generateSucc(res, Message.DATA_FEATCHED, data);
    })
}