import express from 'express';
import * as authController from '../../controller/auth';
import { basicAuth, brokkerAuth, employeeAuth, employerAuth } from '../../middleware/auth';

const authRouter = express.Router();

interface MyUserRequest extends express.Request {
    user?: object;
}

////////////////////////////////////For testing Purpose only////////////////////////////////
authRouter.get('/broker/check', basicAuth, brokkerAuth,(req:MyUserRequest, res:express.Response)=>{
    //console.log("Check Passed!", req.user);
    res.json(req.user)
})

authRouter.get('/employee/check', basicAuth, employeeAuth, (req:MyUserRequest, res:express.Response)=>{
    //console.log("Check Passed!", req.user);
    res.json(req.user)
})

authRouter.get('/employer/check', basicAuth, employerAuth, (req:MyUserRequest, res:express.Response)=>{
    //console.log("Check Passed!", req.user);
    res.json(req.user)
})

/////////////////////////////////testing ends here///////////////////////////////////////////

authRouter.post('/register', authController.register.postAction);
authRouter.post('/genrateToken', authController.genrateToken.postAction);
authRouter.post('/login', authController.login.postAction);
//authRouter.get('/logout', auth, authController.logout.getAction);

export {authRouter}