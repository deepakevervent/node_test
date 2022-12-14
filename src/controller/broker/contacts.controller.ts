import express from "express";
import * as helper from '../../helper';
import * as Service from '../../services';
import * as Message from '../../utils/constants/broker.contacts.constants';

export const schema = () => {
    const validationObject = {
        'string.base': Message.TITLE_SHOULD_BE_A_TYPE_OF_TEXT,
        'string.empty': Message.TITLE_CANNOT_BE_AN_EMPTY_FIELD,
        'string.min': Message.TITLE_SHOULD_HAVE_A_MAXIMUM_LENGTH,
        'any.required': Message.FIELD_IS_REQUIRED
    } 

    const myFun = (name)=>{

    }
    
    const joi = require('joi');
    
    return joi.object().keys({
        title: joi.string().min(2).max(4).required(),
        firstName: joi.string().min(3).max(20).required(),
        lastName: joi.string().min(3).max(20).required(),
        email: joi.string().min(3).max(20).required(),
    });
}

interface MyUserRequest extends express.Request {
    user?: object;
}

export const postAction = async(req: MyUserRequest, res: express.Response) => {
    if (helper.validateRequest(schema(), req.body, res)) return;

    const { title, firstName, lastName, midName } = req.body;
    
}