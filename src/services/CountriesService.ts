import * as Models from '../model/index';

export const getCountriesData = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [];
    Models.CountriesData.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};