'use strict';
var parseString = require('xml2js').parseString;
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function (zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function (val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function (val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function (val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function (val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function (val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function (val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function (val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var request = require('request');
var expect = chai.expect;

describe('/user/{username}', function () {
  describe('get', function () {
    it('should respond with 200 successful operation', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "username": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "userStatus": {
            "type": "integer",
            "format": "int32",
            "description": "User Status"
          }
        },
        "xml": {
          "name": "User"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(200);

          var xml2jsConfig = {};

          parseString(res.text, xml2jsConfig, function (parseErr, result) {
            if (parseErr) return done(parseErr);
            expect(validator.validate(result, schema)).to.be.true;
            done();
          });
        });
    });

    it('should respond with 200 successful operation', function (done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "username": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "phone": {
            "type": "string"
          },
          "userStatus": {
            "type": "integer",
            "format": "int32",
            "description": "User Status"
          }
        },
        "xml": {
          "name": "User"
        }
      };

      /*eslint-enable*/
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(200);

          expect(validator.validate(body, schema)).to.be.true;
          done();
        });
    });

    it('should respond with 400 Invalid username supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 400 Invalid username supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

  });

  describe('put', function () {
    it('should respond with 400 Invalid user supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          body: 'DATA GOES HERE'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 400 Invalid user supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          body: 'DATA GOES HERE'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          body: 'DATA GOES HERE'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          body: 'DATA GOES HERE'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

  });

  describe('delete', function () {
    it('should respond with 400 Invalid username supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 400 Invalid username supplied', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(400);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

    it('should respond with 404 User not found', function (done) {
      request({
        url: 'http://petstore.swagger.io/v2/user/test1234',
        json: true,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      },
        function (error, res, body) {
          if (error) return done(error);

          expect(res.statusCode).to.equal(404);

          // expect(body).to.equal(null); // non-json response or no schema
          done();
        });
    });

  });

});
