import mongoose from 'mongoose';

export const AccessTokenDeatilsSchema = new mongoose.Schema({
    userId: {
        index: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' 
    },
    accessToken: {
        type: String,
        required: true
    },
    validUpto: {
        type: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const User = mongoose.model('AccessTokenDeatils', AccessTokenDeatilsSchema);
export default User;
