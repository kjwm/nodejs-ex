'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: String
    },
    type: {
        type: String
    },
    type_format: {
        type: String
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date
    }
});

module.exports = mongoose.model('Settings', TaskSchema);
