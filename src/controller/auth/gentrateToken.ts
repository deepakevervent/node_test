import * as helper from '../../helper';
import {UserServices, TokenServices} from '../../services';
import express from "express";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import {config} from '../../config';
import * as Message from '../../utils/constants/auth.constants';

export const schema = () => {
    const joi = require('joi');
    return joi.object().keys({
        username: joi.string().min(3).max(20).required(),
        password: joi.string().min(3).max(15).required(),
    });
}

export const postAction = async(req: express.Request, res: express.Response) => {
    if (helper.validateRequest(schema(), req.body, res)) return;

    const {username, password} = req.body;

    UserServices.getUser({username}, {}, {lean:true}, (err, result)=>{
        if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS);
        
        if (!result || result.length == 0) {
            return helper.generateErr(res, Message.INVALID_USER_NAME_PLEASE_CHECK, 401);
        } else {

            //password check logic
            const isMatched = bcrypt.compareSync(password, result[0].password)
            if(!isMatched) return helper.generateErr(res, Message.INCORRECT_PASSWORD, 401);

            const token = jwt.sign({
                data: result[0]
            }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expire_in });

            //to save accessTokenDetails
            result = {accessToken:token, validUpto:config.auth.jwt_expire_in, userId:result[0]._id, updatedAt:Date.now()}

            //check isToken is already Created then update
            TokenServices.getAccessToken({userId:result.userId}, {}, {},(err, data)=>{
               if(err) return helper.generateErr(res, Message.Error_WHILE_GETTING_ACCESSTOKEN_DETAILS); 
               if(data.length !== 0 ){
                    //if exists then update
                    TokenServices.updateAccessTokenDetails({userId:result.userId}, result, {}, (err, data)=>{
                        if (err) return helper.generateErr(res, Message.ERROR_WHILE_SAVING_ACCESSTOKEN_DETAILS);
                        return helper.generateSucc(res, Message.TOKEN_REFRESHED_SUCCESSFULLY, data);
                    })
               }else{
                    //if not exists then create
                    TokenServices.createAccessTokenDetails(result,(err, data)=>{
                        if (err) return helper.generateErr(res, Message.ERROR_WHILE_SAVING_ACCESSTOKEN_DETAILS);
                        return helper.generateSucc(res, Message.TOKEN_GENRATED_SUCCESSFULLY, data);
                    });
               }
            }) 

        }
    })
}