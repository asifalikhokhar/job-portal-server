"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema(
  {
    jobType: String,
    title: String,
    description: String,
    company: String,
    location: String,
    experience: String,
    industry: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

JobSchema.statics.findByUser = function(user) {
  return this.find({
    user
  })
    .sort({ createdAt: -1 })
    .exec();
};

JobSchema.statics.findById = function(id) {
  return this.findOne({
    _id: id
  }).exec();
};

JobSchema.statics.deleteById = function(id) {
  return this.findOneAndDelete({
    _id: id
  }).exec();
};

module.exports = mongoose.model("Job", JobSchema);
