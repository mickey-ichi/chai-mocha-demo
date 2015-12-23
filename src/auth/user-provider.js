var Promise = require('bluebird');

var UserProvider = function (userCollection) {
    this.userCollection = userCollection;
};

UserProvider.prototype.findByUsername = function (username) {
    return Promise.promisify(
        this.userCollection.findOne,
        {context: this.userCollection}
    )({username: username});
};

module.exports = UserProvider;