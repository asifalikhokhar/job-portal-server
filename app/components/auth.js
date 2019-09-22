"use strict";
const jwt = require("jsonwebtoken");
const Q = require("q");

class AuthComponent {
  constructor(secret) {
    this.secret = secret;
  }
  decodeToken(token) {
    const secret = this.secret;
    return Q.Promise(
      function(resolve, reject, notify) {
        jwt.verify(token, secret, function(err, decoded) {
          if (err) reject("Invalid Token");
          else resolve(decoded);
        });
      }.bind(this)
    );
  }
  encodeToken(user) {
    const secret = this.secret;
    return Q.Promise(function(resolve, reject, notify) {
      const info = {
        _id: user._id,
        email: user.email,
        password: user.password,
        mobile: user.mobile
      };
      if (user.deviceToken) {
        info.deviceToken = user.deviceToken;
        info.platform = user.platform;
      }
      var token = jwt.sign(info, secret);
      user["token"] = token;
      resolve(user);
    });
  }
}

module.exports = AuthComponent;
