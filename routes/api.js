var mongoose = require('mongoose');
var passport = require('passport');

var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require("../app/models/user");

//Controllers
var budget = require('../app/Budget'),
 income = require('../app/Income'),
 category = require('../app/Category'),
 expense = require('../app/Expense');

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });
    }
  });

  router.post('/signin', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toObject(), config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
  });

//Category routes
router.get('/categories', passport.authenticate('jwt', { session: false}), category.list_all_categories);
router.post('/categories', passport.authenticate('jwt', { session: false}), category.create_a_category);

router.get('/categories/:id', passport.authenticate('jwt', { session: false}), category.read_a_category);
router.put('/categories/:id', passport.authenticate('jwt', { session: false}), category.update_a_category);
router.delete('/categories/:id', passport.authenticate('jwt', { session: false}), category.delete_a_category);

//Budget
router.get('/budget', passport.authenticate('jwt', { session: false}), budget.list_all_items);
router.post('/budget', passport.authenticate('jwt', { session: false}), budget.create_an_item);

router.get('/budget/:taskId', passport.authenticate('jwt', { session: false}), budget.read_an_item);
router.put('/budget/:taskId', passport.authenticate('jwt', { session: false}), budget.update_an_item);
router.delete('/budget/:taskId', passport.authenticate('jwt', { session: false}), budget.delete_an_item);

//Income
router.get('/income', passport.authenticate('jwt', { session: false}), income.list_all_items);
router.post('/income', passport.authenticate('jwt', { session: false}), income.create_an_item);

router.get('/income/:taskId', passport.authenticate('jwt', { session: false}), income.read_an_item);
router.put('/income/:taskId', passport.authenticate('jwt', { session: false}), income.update_an_item);
router.delete('/income/:taskId', passport.authenticate('jwt', { session: false}), income.delete_an_item);

//Expense routes
router.get('/expense', passport.authenticate('jwt', { session: false}), expense.list_all);
router.post('/expense', passport.authenticate('jwt', { session: false}), expense.create_item);

router.get('/expense/:id', passport.authenticate('jwt', { session: false}), expense.read_item);
router.put('/expense/:id', passport.authenticate('jwt', { session: false}), expense.update_item);
router.delete('/expense/:id', passport.authenticate('jwt', { session: false}), expense.delete_item);

module.exports = router;