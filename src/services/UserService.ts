import * as Models from '../model/index'

export const getUser = function (criteria, projection, options, callback) {
    options.lean = true;
    let populateQuery = [
        // {
        //     path: 'User',
        //     select: '_id username userType isVerified',
        //     //options: { retainNullValues: true }
        // }
    ];
    Models.User.default.find(criteria, projection, options).populate(populateQuery).exec( function (err, data) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, data);
        }
    });
};

export const createUser = function (objToSave, callback) {
    new Models.User.default(objToSave).save(callback)
}

export const updateUser = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.User.default.findOneAndUpdate(criteria, dataToSet, options, callback);
};

export const deleteUser = function (criteria, callback) {
    Models.User.default.findOneAndRemove(criteria, callback);
};

export const aggregateUser = function (criteria, callback) {
    Models.User.default.aggregate(criteria, callback)
}

export const updateManyAdmin = function (criteria, dataToSet, options, callback) {
    Models.User.default.updateMany(criteria, dataToSet, options, callback);
};
