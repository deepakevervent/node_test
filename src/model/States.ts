import mongoose from 'mongoose';

export const StatesSchema = new mongoose.Schema({
    id: {
        index: true,
        type: Number
    },
    country_id: {
        index: true,
        type: Number,
        ref: 'Countries'
    },
    country_code: {
        type: String
    },
    country_name: {
        type: String
    },
    state_code: {
        type: String
    },
    latitude:{type: String},
    longitude: {type: String},
})

const States = mongoose.model('States', StatesSchema);
export default States;
