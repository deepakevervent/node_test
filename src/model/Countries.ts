import mongoose from 'mongoose';

export const CountriesSchema = new mongoose.Schema({
    id: {
        index: true,
        type: Number,
        ref: 'States' 
    },
    name: {
        type: String,
        required: true
    },
    iso3: {
        type: String
    },
    iso2: {
        type: String
    },
    numeric_code: {
        type: String
    },
    phone_code: {
        type: String 
    },
    capital: {
        type: String
    },
    currency: {
        type: String
    },
    currency_name: {
        type: String
    },
    currency_symbol: {
        type: String
    },
    tld: {
        type: String
    },
    native: {
        type: String
    },
    region: {
        type: String
    },
    subregion: {
        type: String
    },
    timezones: [
        {
            zoneName: {type: String},
            gmtOffset: {type: Number},
            gmtOffsetName: {type: String},
            abbreviation: {type: String},
            tzName: {type: String}
        }
    ],
    latitude:{type: String},
    longitude: {type: String},
    emoji: {type: String},
    emojiU: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const Countries = mongoose.model('Countries', CountriesSchema);
export default Countries;
