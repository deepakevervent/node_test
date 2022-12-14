import mongoose from 'mongoose';

export const CitiesSchema = new mongoose.Schema({
    id: {
        index: true,
        type: Number
    },
    name: {
        type: String
    },
    state_id: {
        index: true,
        type: Number,
        ref: 'States'
    },
    state_code: {
        type: String
    },
    state_name: {
        type: String
    },
    country_name: {
        type: String
    },
    country_id: {
        type: Number
    },
    country_code: {
        type: Number
    },
    latitude:{type: String},
    longitude: {type: String},
})

const Cities = mongoose.model('Cities', CitiesSchema);
export default Cities;
