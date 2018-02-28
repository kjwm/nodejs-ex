'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date
    }
});

module.exports = mongoose.model('Categories', TaskSchema);
