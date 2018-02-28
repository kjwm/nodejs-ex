'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type : Schema.ObjectId,
        ref : 'Categories'
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

module.exports = mongoose.model('Expenses', TaskSchema);
