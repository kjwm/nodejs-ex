'use strict';


var mongoose = require('mongoose'),
    Item = require('../models/Category'),//mongoose.model('Categories');
    helpers = require('../helpers');

exports.list_all_categories = function(req, res) {
    
    Item.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.create_a_category = function(req, res) {
    var new_item = new Item(req.body);
    new_item.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.read_a_category = function(req, res) {
    Item.findById(req.params.id, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_category = function(req, res) {
    Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete_a_category = function(req, res) {

    Item.remove({
        _id: req.params.id
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Item successfully deleted' });
    });
};
