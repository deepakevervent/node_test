import express from 'express';
import { UserServices } from '../services';
import jwt from 'jsonwebtoken';
import {config} from '../config';
import * as helper from '../helper';
import * as Message from '../utils/constants/auth.constants';
import { SUPER_ADMIN } from '../model/Users';
import { getPermissions } from '../utils/scripts/permission';

interface MyUserRequest extends express.Request {
    user?: object;
}

const basicAuth = (req: MyUserRequest, res: express.Response, next:any) => {
    let token = req.cookies.auth;
    jwt.verify(token, config.auth.jwt_secret, async function(err:any, decoded:any) {
        if (err) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID , 401);

        UserServices.getUser({_id: decoded.data._id}, {}, {}, (err, data)=>{
            if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS, 401);
            if(data.length==0) return helper.generateErr(res, Message.USER_SHOULD_BE_LOGGED, 401);
            req.user = data[0]
            next();
        });
    });
}

const brokkerAuth = (req: MyUserRequest, res: express.Response, next:any) => {
    let token = req.cookies.auth;
    let accessControl 
    jwt.verify(token, config.auth.jwt_secret, async function(err:any, decoded:any) {
        if (err) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID , 401);
        accessControl = getPermissions(decoded.data.userType);
        if (accessControl.length!==2) return helper.generateErr(res, Message.YOU_DONT_HAVE_ACCESS_TO_THIS_ROUTE, 401);
        
        UserServices.getUser({_id: decoded.data._id}, {}, {}, (err, data)=>{
            if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS, 401);
            if(data.length==0) return helper.generateErr(res, Message.USER_SHOULD_BE_LOGGED, 401);
            req.user = data[0];
            next();
        });
    });
}

const employeeAuth = (req: MyUserRequest, res: express.Response, next:any) => {
    let token = req.cookies.auth;
    let accessControl 
    jwt.verify(token, config.auth.jwt_secret, async function(err:any, decoded:any) {
        if (err) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID , 401);
        accessControl = getPermissions(decoded.data.userType);
        if (accessControl.length!==1) return helper.generateErr(res, Message.YOU_DONT_HAVE_ACCESS_TO_THIS_ROUTE, 401);
        
        UserServices.getUser({_id: decoded.data._id}, {}, {}, (err, data)=>{
            if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS, 401);
            if(data.length==0) return helper.generateErr(res, Message.USER_SHOULD_BE_LOGGED, 401);
            req.user = data[0];
            next();
        });
    });
}

const employerAuth = (req: MyUserRequest, res: express.Response, next:any) => {
    let token = req.cookies.auth;
    let accessControl 
    jwt.verify(token, config.auth.jwt_secret, async function(err:any, decoded:any) {
        if (err) return helper.generateErr(res, Message.ACCESS_TOKEN_IS_NOT_VALID , 401);
        accessControl = getPermissions(decoded.data.userType);
        if (accessControl.length!==0) return helper.generateErr(res, Message.YOU_DONT_HAVE_ACCESS_TO_THIS_ROUTE, 401);
        
        UserServices.getUser({_id: decoded.data._id}, {}, {}, (err, data)=>{
            if(err) return helper.generateErr(res, Message.ERROR_WHILE_FEATCHING_USER_DETAILS, 401);
            if(data.length==0) return helper.generateErr(res, Message.USER_SHOULD_BE_LOGGED, 401);
            req.user = data[0];
            next();
        });
    });
}

export {basicAuth, brokkerAuth, employeeAuth, employerAuth }