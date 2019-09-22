"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, index: true },
    password: { type: String, select: false }
  },
  { timestamps: true }
);

UserSchema.statics.login = function(data) {
  return this.findOne({ email: data.email, password: data.password }).exec();
};

UserSchema.statics.findByEmail = function(email) {
  return this.findOne({
    email: email
  }).exec();
};

UserSchema.statics.findById = function(id) {
  return this.findOne({
    _id: id
  }).exec();
};

UserSchema.statics.findByIdSelectPassword = function(id) {
  return this.findOne({
    _id: id
  })
    .select("+password")
    .exec();
};

UserSchema.statics.updateUser = function(id, data) {
  return this.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  ).exec();
};

module.exports = mongoose.model("User", UserSchema);
