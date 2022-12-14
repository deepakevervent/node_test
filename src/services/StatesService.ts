import * as Models from '../model/index';

export const getStatesData = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [];
    Models.States.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};