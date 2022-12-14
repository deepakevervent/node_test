import mongoose from 'mongoose';

export const PostalCodeSchema = new mongoose.Schema({
    COUNTRY: {
        index: true,
        type: String
    },
    POSTAL_CODE: {
        index: true,
        type: String
    },
    CITY: {
        index: true,
        type: String
    },
    STATE: {
        index: true,
        type: String
    }
})

const PostalCode = mongoose.model('PostalCode', PostalCodeSchema);
export default PostalCode;