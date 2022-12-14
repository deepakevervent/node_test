import * as Models from '../model/index'

export const getAccessToken = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [];
    Models.AccessTokenDetail.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};

export const createAccessTokenDetails = function (objToSave, callback) {
    new Models.AccessTokenDetail.default(objToSave).save(callback)
}

export const updateAccessTokenDetails = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.AccessTokenDetail.default.findOneAndUpdate(criteria, dataToSet, options, callback);
};

export const deleteAccessTokenDetails = function (criteria, callback) {
    Models.AccessTokenDetail.default.findOneAndRemove(criteria, callback);
};
