var Promise = require('bluebird');

var UserProvider = function (userCollection) {
    this.userCollection = userCollection;
};

UserProvider.prototype.findByUsername = function (username) {
    var findQuery = this.userCollection.find({ username: username }).limit(1);

    return Promise.promisify(findQuery.next, { context: findQuery })();
};

module.exports = UserProvider;