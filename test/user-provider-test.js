var beforeEach      = require('mocha').beforeEach;
var afterEach       = require('mocha').afterEach;
var describe        = require('mocha').describe;
var it              = require('mocha').it;
var expect          = require('chai').expect;
var MongoClient     = require('mongodb').MongoClient;
var UserProvider    = require('./../src/auth').UserProvider;

describe('User Provider service', function () {
    var userStubs = [
        {
            username: 'rikky',
            password: 'rikky'
        },
        {
            username: 'mikky',
            password: 'mikky'
        },
        {
            username: 'hanny',
            password: 'hanny'
        }
    ];
    var mongodb = null;

    beforeEach(function (done) {
        var url = 'mongodb://localhost:27017/test';

        MongoClient.connect(url, function (err, db) {
            if (err) {
                return done(err);
            }
            db.collection('users').removeMany({}, function (err) {
                if (err) {
                    return done(err);
                }
                mongodb = db;
                db.collection('users').insert(userStubs, done);
            });
        });
    });

    afterEach(function () {
        mongodb.close();
    });

    describe('find by username', function () {
        it('should 1 user', function (done) {
            var userProvider = new UserProvider(mongodb.collection("users"));
            var username     = "mikky";

            userProvider.findByUsername(username).then(function (user) {
                expect(user.username).to.equal(username);
                done();
            });

        })
    });
});