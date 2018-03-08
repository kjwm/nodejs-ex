'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    budget_id: {
        type: Schema.ObjectId,
        ref: 'Budgets'
    }
});

module.exports = mongoose.model('UserBudgets', TaskSchema);
