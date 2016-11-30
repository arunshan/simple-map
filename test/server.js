/*jshint esversion: 6 */
var expect  = require("chai").expect;
var request = require("request");

describe("Simple Maps Tests", function() {
  describe("Create User Account", function() {
    var url = "http://localhost:3000/register";
    it("Creating user", function(done) {
      var data = {
        username: '',
        password: ''
      };
      request({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        },
        body: JSON.stringify(data)
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("Login User", function() {

    var url = "http://localhost:3000/login";

    it("Login a new user", function(done) {
      var data = {
        username: '',
        password: ''
      };
      request({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        },
        body: JSON.stringify(data)
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("Check if user is already in session", function(done) {
      var data = {
        username: '',
        password: ''
      };
      request({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        },
        body: JSON.stringify(data)
      }, function(error, response, body) {
        expect(response.statusCode).to.equal(302);
        done();
      });
    });
  });
});
