var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


router.get("/",function(req,res){
  res.render('index');
});

router.get("/login",function(req,res){
  // console.log(req.flash("error"));
  res.render("login", {error : req.flash("error")});
})

router.get("/profile", isLoggedIn ,async function(req,res,next){
  let user = await userModel.findOne({
    username : req.session.passport.user
  })
  console.log(user);
  res.render("profile",{user:user});
});

router.get("/feed",function(req,res){
  res.render("feed");
})

router.post("/register",function(req,res){
  const {username , email , fullname} = req.body;
  const userData = new userModel({username , email ,fullname});

  userModel.register(userData,req.body.password)
  .then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    });
  });
});

router.post("/login",passport.authenticate("local",{
  successRedirect : "/profile",
  failureRedirect : "/login",
  failureFlash : true
}),function(req,res){
});

router.get("/logout",function(req,res){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect("/login");
  });
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}




// router.get("/",function(req,res,next){
//   res.send("done");
// });

// router.get("/createuser",async function(req,res,next){
//   let user = await userModel.create({
//     username:"aditya",
//     password:"aditya",
//     email:"aditya@gmail.com",
//     fullName:"adityagupta"
//   });
//   res.send(user);
// });

// router.get("/findAllUser",async function(req,res){
//   let all = await userModel.find();
//   res.send(all);
// });

// router.get("/createpost",async function(req,res,next){
//   let posts = await postModel.create({
//     postText:"POSTS",
//   user:"65dc7fd93c13620b65a6df8b", 
//   });
//   res.send(posts);
// });

// router.get("/findpost",async function(req,res){
//   let findPost = await postModel.find();
//   res.send(findPost); 
// });



module.exports = router;
