'use strict';
var chai = require('chai');
var request = require('request');
var expect = chai.expect;

describe('/user', function () {
  describe('post', function () {
    it('should respond with default successful operation', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user',
        json: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          "id": 9999,
          "username": "test1234",
          "firstName": "string",
          "lastName": "string",
          "email": "string",
          "password": "string",
          "phone": "string",
          "userStatus": 0
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(200);

          // expect(body).to.eql(null); // non-json response or no schema
          done();
        });
    });
  });

});
