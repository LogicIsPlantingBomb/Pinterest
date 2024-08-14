var express = require('express');
var router = express.Router();
var userModel = require ("./users")
var postModel = require ("./post")
var passport = require("passport");
var localStrategy = require("passport-local");
const upload = require("./multer");

passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index',{nav:false});
});

router.get('/register', function(req, res, next) {
	res.render("register",{nav:false})
});
router.get("/profile",isLoggedIn,async function(req,res,next){
	  try {
    const user = await userModel
		.findOne({ username: req.session.passport.user })
		.populate("posts")
		  console.log(user);
    if (!user) {
      return res.redirect('/');
    }
    res.render("profile", {user,nav:true });
  } catch (error) {
    next(error);
  }
});
router.get("/add",function(req,res,next){
	res.render("add",{nav:true});
});
router.get("/show/posts",isLoggedIn,async function(req,res,next){
	const user = await userModel
               .findOne({ username: req.session.passport.user })
               .populate("posts")
	res.render("show",{user, nav:true});
});
router.get('/feed', isLoggedIn, async function(req, res, next) {
    try {
        const user = await userModel.findOne({ username: req.session.passport.user });
        const posts = await postModel.find().populate("user");
	console.log(posts);

        res.render("feed", { user, posts, nav: true });
    } catch (error) {
        next(error);
    }
});

router.post("/createpost",isLoggedIn,upload.single("postimage"),async function(req,res,next){
	const user = await userModel.findOne({username:req.session.passport.user});
	const post= await postModel.create({
		user:user._id,
		title:req.body.title,
		description:req.body.description,
		image:req.file.filename
	})
	user.posts.push(post._id);
	await user.save();
	res.redirect("/profile")
	
})
router.post("/fileupload",isLoggedIn,upload.single("image"),async function(req,res,next){
	  try {
    const user = await userModel.findOne({ username: req.session.passport.user });
    if (!user) {
      return res.redirect('/');
    }
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
})
router.post("/register",function(req,res,next){
	const data= new userModel({
		username:req.body.username,
		password:req.body.password,
		email:req.body.email,
		fullname:req.body.fullname
	})
	userModel.register(data,req.body.password)
	.then(function(){
		passport.authenticate("local")(req,res,function(){
			res.redirect("/profile")
		})
	})
})

router.post("/",passport.authenticate("local",{
	successRedirect:"/profile",
	failureRedirect:"/"
}),function(req,res){});
router.get("/profile/logout",function(req,res,next){
        req.logout(function(err){
                if(err) {return next(err)};
                res.redirect("/");
        });
});

function isLoggedIn(req,res ,next){
	  if(req.isAuthenticated()){
		  return next()};
        res.redirect("/",);
}
module.exports = router;
