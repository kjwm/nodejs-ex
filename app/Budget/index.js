'use strict';

var mongoose = require('mongoose'),
  Budget = require('../models/Budget');

exports.list_all_items = function(req, res) {
    var user =  req.user;
    Budget.find({ 'user_id': user._id }).exec(function(err, items) {
        if (err)
            res.send(err);

        res.json(items);
    });
};

exports.create_an_item = function(req, res) {
  var post = req.body;
    post.created_by = req.user._id;

  //Check if it exists first  
  Budget.find({
    "frm_date": {"$gte": new Date(post.frm_date)},
    "to_date": {"$lte": new Date(post.to_date)}
  }).exec(function(err, budget) {
    if (err)
        res.send(err);

    //It already exists
    if(budget) {
      res.status(401).send({success: false, msg: 'Budget exists for the date range.'});
    }

    //Create if it does not exist
    var new_item = new Budget(post);
    
    new_item.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  });
};

exports.read_an_item = function(req, res) {
  Budget.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_an_item = function(req, res) {
    Budget.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.delete_an_item = function(req, res) {

  Budget.remove({
    _id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Budget successfully deleted' });
  });
};
