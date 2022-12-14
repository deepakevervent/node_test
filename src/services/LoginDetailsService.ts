import * as Models from '../model/index'

export const getLoginDetails = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [];
    Models.LoginDetails.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};

export const createLoginDetails = function (objToSave, callback) {
    new Models.LoginDetails.default(objToSave).save(callback)
}

export const updateLoginDetails = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.LoginDetails.default.findOneAndUpdate(criteria, dataToSet, options, callback);
};

export const deleteLoginDetails = function (criteria, callback) {
    Models.LoginDetails.default.findOneAndRemove(criteria, callback);
};
