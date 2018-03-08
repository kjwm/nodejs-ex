'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  category: {
    type : Schema.ObjectId,
    ref : 'Categories'
  },
  budget_id: {
    type: Schema.ObjectId,
    ref: 'Budgets'
  },
  user_id: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  modified_on: {
    type: Date
  }
});

module.exports = mongoose.model('Items', TaskSchema);
