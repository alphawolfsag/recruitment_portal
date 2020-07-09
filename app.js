/**
 * Author: Darrel Clive Magasu (alphawolfsag)
 * Entry Point For the whole PWA / Web Application.
 */
//=============================Variables Setup===============================
var mysql = require('mysql');
var passwordHash = require('password-hash');
const session = require('express-session');
var express = require('express'),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");


var router = express.Router({ mergeParams: true });



var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b899f683adb614',
    password: '39f6f8d3',
    database: 'heroku_16f305c472784d0'
});

//=============================Initial Setup=================================


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//in root folder make a folder for keeping ejs templates called *views*
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//in root folder make an assets folder for all assets called *public*
app.use(express.static("public"));
app.use(session({secret: 'sss1hhhhh',saveUninitialized: true,resave: true}));
var sess;
// Global Variables
app.use(function(req, res, next) {


    // res.locals.error = req.flash("error");
    // res.locals.success = req.flash("success");
    res.locals.tabSelectedMain = "profile";
    res.locals.tabSelectedDash = "profile";
    res.locals.currentname = "Panapa";
    res.locals.currentpic = "/images/profile.png";
    next();
});


//================================= Routes ================================
var indexRoutes = require("./routes/index_routes");
app.use(indexRoutes);

//used for 404 errors
app.get("*", function(req, res) {
    //create an ejs for rendering a 404 error
    //res.render("404");
    res.send("failed");
});

//=========================================================================
//app running on port 3000 *change this when launching*



app.listen(process.env.PORT || 4000,function(){
console.log(" Test port 4000 on localhost");
console.log("recruitment_portal v1 server is now online ...");
});


//=================================END OF CODE=============================
