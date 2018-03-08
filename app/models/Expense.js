'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    description: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    trans_date: {
        type: Date
    },
    recurring: {
        type: Boolean,
        default: 0
    },
    frequency: {
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
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_on: {
        type: Date
    }
});

module.exports = mongoose.model('Expenses', TaskSchema);
