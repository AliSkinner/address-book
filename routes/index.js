var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get Hello World page
router.get('/helloworld', function(req, res){
  res.render('helloworld', { title: 'Hello, World!'})
});


router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});


// GET new user page
router.get('/newuser', function(req,res){
  res.render('newuser', {title: 'Add New User'});
});

// Post to Add User service
router.post('/adduser', function(req,res){

  // set internal DB variable
  var db = req.db;

  // get the form values. these rely on the name attributes

  var userName = req.body.username;
  var userEmail = req.body.useremail;

  // set the collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
    "username" : userName,
    "email" : userEmail
  }, function (err, doc) {
    if (err) {
      res.send("Problem occured");
    }
    else {
      // if it worked, set the header so the address bar doesn't say /adduser
      res.location("userlist");
      // redirect to success page
      res.redirect("userlist");
    };
  
  })
});


module.exports = router;



















