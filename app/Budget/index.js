'use strict';

var mongoose = require('mongoose'),
  Category = require('../models/Category'),
  Item = require('../models/Item');

var category = require('../Category');

exports.list_all_items = function(req, res) {
    var user =  req.user;
    Item.find({ 'user_id': user._id }).populate('category').exec(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};

exports.create_an_item = function(req, res) {
  var new_item = new Item(req.body);
  new_item.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_an_item = function(req, res) {
  Item.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_an_item = function(req, res) {
  Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_an_item = function(req, res) {


  Item.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Item successfully deleted' });
  });
};
