'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({    
    frm_date: {
        type : Date
    },
    to_date: {
        type : Date
    },
    created_by: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_by: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    modified_on: {
        type: Date
    }
});

module.exports = mongoose.model('Budgets', BudgetSchema);
