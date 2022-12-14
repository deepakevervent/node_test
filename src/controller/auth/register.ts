import express from "express";
import bcrypt from 'bcryptjs';
import {SUPER_ADMIN, ADMIN, CLIENT} from "../../model/Users";
import * as helper from '../../helper';
import * as Service from '../../services/UserService';


export const schema = () => {
    const joi = require('joi');
    return joi.object().keys({
        username: joi.string().min(3).max(20).required(),
        password: joi.string().min(3).max(15).required(),
        userType: joi.string().valid(SUPER_ADMIN, ADMIN, CLIENT).required(),
    });
}

export const postAction = async(req: express.Request, res: express.Response) => {
    if (helper.validateRequest(schema(), req.body, res)) return;

    const { username, password } = req.body
    const saltRounds = 10
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(password, salt);

    //const token = jwt.sign({address: address}, config.auth.jwt_secret,{expiresIn: config.auth.jwt_expire_in});

    Service.getUser({username}, {}, {}, function (err, result) {
        if (err) {
            console.log(err)
            return helper.generateErr(res, 'Signup Failed Internal Error!', 500);
        } else {
            if (!result || result.length == 0) {
                Service.createUser({...req.body, password:hash},(err, user)=>{
                    if (err) return helper.generateErr(res, 'Signup Failed Internal Error!', 500);
                    helper.generateSucc(res, 'Signup Sucessfully Done!', user);
                })
            } else {
                return helper.generateErr(res, 'This Static Username is Alreday Registered!');
            }
        }
    })
}