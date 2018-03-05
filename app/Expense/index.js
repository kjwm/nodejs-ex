'use strict';

var mongoose = require('mongoose'),
    Expense = require('../models/Expense');

exports.list_all = function(req, res) {
    var user =  req.user;
    Expense.find({ 'user_id': user._id }).populate('category').exec(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};

exports.create_item = function(req, res) {
    var post = req.body;
    post.user_id = req.user._id;
    
    var new_item = new Expense(post);
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
