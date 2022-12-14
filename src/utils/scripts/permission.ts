import { ADMIN, CLIENT, SUPER_ADMIN } from "../../model/Users";

export const getPermissions = (userType)=>{
    console.log(userType);
    let accessControl
    //permission feature yet to disscuss
    let permissions = ["read", "write", "delete"];

    if(userType==SUPER_ADMIN){
        accessControl = [ADMIN, CLIENT];
    }else if(userType==ADMIN){
        accessControl = [CLIENT];
    }else{
        accessControl = [];
    }

    return accessControl;
}