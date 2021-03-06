var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'NodeJS-chat' });
});

/* GET userlist. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* POST to add New User page. */
router.post('/adduser', function(req, res) {
  
  // Setting the internal DB-variable
  var db = req.db;
  
  // Retrieveing the form values
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  
  // Setting collection
  var collection = db.get('usercollection');
  
  // Submitting to DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      res.send("A problem occured when trying to ad a new user to the database")
    }
    else {
      res.location("userlist");
      res.redirect("userlist");
    }
  });
});

module.exports = router;
