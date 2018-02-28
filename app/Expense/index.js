'use strict';

var mongoose = require('mongoose'),
    Expense = require('../models/Expense');

exports.list_all = function(req, res) {

    Expense.find({}).populate('category').exec(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};

exports.create_item = function(req, res) {
    var new_item = new Expense(req.body);
    new_item.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.read_item = function(req, res) {
    Expense.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_item = function(req, res) {
    Expense.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete_item = function(req, res) {

    Expense.remove({
        _id: req.params.id
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Item successfully deleted' });
    });
};
