import * as Models from '../model/index';

export const getCitiesData = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [];
    Models.Cities.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};