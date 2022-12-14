import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as helper from '../../helper';
import { UserServices, LoginDetailService} from '../../services';
import { config } from '../../config';
import * as Message from '../../utils/constants/auth.constants';

export const schema = () => {
    const joi = require('joi');
    return joi.object().keys({
        username: joi.string().min(3).max(20).required().messages({
            'string.base': Message.USERNAME_SHOULD_BE_A_TYPE_OF_TEXT,
            'string.empty': Message.USERNAME_CANNOT_BE_AN_EMPTY_FIELDS,
            'string.min': Message.USERNAME_SHOULD_HAVE_A_MINIMUM_LENGTH,
            'any.required': Message.USERNAME_REQUIRED
          }),
        password: joi.string().min(3).max(15).required(),
    });
}

export const postAction = async(req: express.Request, res: express.Response) => {
    if (helper.validateRequest(schema(), req.body, res)) return;

    const {username, password} = req.body;
    const accessToken  = req.headers['access-token'];

    jwt.verify(accessToken, config.auth.jwt_secret, function(err, decoded) {
        if (err) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID, 401);
        //console.log(decoded)

        UserServices.getUser({username}, {}, {lean:true}, (err, result)=>{
        
            if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS);
            
            if (!result || result.length == 0) {
                return helper.generateErr(res, Message.INVALID_USER_NAME_PLEASE_CHECK, 401);
            } else {
                const userId = result[0]._id;

                //check1 weather the access token is gentrated for the user that wants to login?
                if(decoded.data._id != userId) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID_FOR_THIS_USER, 401);

                //check2 password check logic
                const isMatched = bcrypt.compareSync(password, result[0].password)
                if(!isMatched) return helper.generateErr(res, Message.INCORRECT_PASSWORD, 401);
                
                //create userToken
                const userToken = jwt.sign({
                    data: result[0]
                }, config.auth.jwt_secret, { expiresIn: config.auth.jwt_expire_in });

                //object To Save
                let objToSave = {
                    accessToken, 
                    userToken,
                    validUpto:config.auth.jwt_expire_in, 
                    userId,
                }

                //create login details
                LoginDetailService.getLoginDetails({userId}, {}, {},(err, data)=>{
                    if(err) return helper.generateErr(res, Message.ERROR_WHILE_GETTING_LOGIN_DETAILS);
                    if(data.length !== 0 ){
                        //check3 where if user is already logged in
                        LoginDetailService.updateLoginDetails({userId}, objToSave, {}, (err, data)=>{
                            if (err) return helper.generateErr(res, Message.ERROR_WHILE_CREATING_LOGIN_DETAILS);
                            res.cookie("auth", userToken);
                            return helper.generateSucc(res, Message.USER_LOGGED_IN, data);
                        })

                        //return helper.generateErr(res, Message.USER_IS_ALREADY_LOGGED_IN, 401);
                    }else{
                        //if not exists then create
                        LoginDetailService.createLoginDetails({...objToSave, isLoggedIn:true},(err, data)=>{
                            if (err) return helper.generateErr(res, Message.ERROR_WHILE_CREATING_LOGIN_DETAILS);
                            // option to make cookies more secure will add when deploy to the https server { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true }
                            res.cookie("auth", userToken);
                            return helper.generateSucc(res, Message.USER_LOGGED_IN, data);
                        });
                    }
                })                 
            }
        })
    });
}