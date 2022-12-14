import mongoose from 'mongoose';

export const SUPER_ADMIN = 'SUPER_ADMIN';
export const ADMIN = 'ADMIN';
export const CLIENT = 'CLIENT';

export const LIST_FIELDS = '-_id -address -nonce -__v -token';

export const UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true, index:true},
    password: {type: String, required:true},
    age:{type:String},
    userType:{
        type:String,
        enum:[SUPER_ADMIN, ADMIN, CLIENT],
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    validUpto: {
        type: Number
    },
    token:{
        type:String
    },
})

const User = mongoose.model('User', UserSchema);
export default User;
