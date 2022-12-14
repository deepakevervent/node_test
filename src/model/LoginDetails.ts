import mongoose from 'mongoose';

export const LoginDeatilsSchema = new mongoose.Schema({
    userId: {
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    },
    validUpto: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    userToken: {
        type: String,
        required: true
    },
    lastActivityTime: {
        date: Date,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const LoginDetails = mongoose.model('LoginDetails', LoginDeatilsSchema);
export default LoginDetails;
