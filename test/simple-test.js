var describe = require('mocha').describe;
var it       = require('mocha').it;
var expect   = require('chai').expect;
var Auth     = require('./../src/auth').Auth;

describe('Auth service', function () {
    describe('do authenticate by password', function () {
        describe('with wrong user name', function () {
            var userProviderStub = {
                findByUsername: function () {
                    return null
                }
            };

            var auth = new Auth(userProviderStub);

            it('should throw invalid user name error', function () {
                expect(function () {
                    auth.check('foo', 'bar')
                }).to.throw('Invalid Username');

            });
        });
        describe('with wrong password', function () {
            var userProviderStub = {
                findByUsername: function () {
                    return {
                        password: 'password'
                    };
                }
            };

            var auth = new Auth(userProviderStub);

            it('should throw invalid password error', function () {
                expect(function () {
                    auth.check('foo', 'otherPassword')
                }).to.throw('Invalid Password');
            });
        });

        describe('with correct user name and password', function () {
            var user = {
                name: 'Joe Doe',
                password: 'password'
            };

            var userProviderStub = {
                findByUsername: function () {
                    return user;
                }
            };

            var auth = new Auth(userProviderStub);
            it('should return the user', function () {
                expect(auth.check('Joe Doe', 'password')).to.be.deep.equal({
                    name: 'Joe Doe',
                    password: 'password'
                });
            })
        });
    });
});