var Auth = function (userProvider) {
    this.userProvider = userProvider;
};

Auth.prototype.check = function (username, password) {

    var user = this.userProvider.findByUsername(username);

    if (!user) {
        throw new Error('Invalid Username');
    }

    if (password !== user.password) {
        throw new Error('Invalid Password')
    }

    return user;
};

module.exports = Auth;