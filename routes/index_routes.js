/**
 * Author: Darrel Clive Magasu (alphawolfsag)
 * Edited By: Pardon Juru (Ocean Manta)
 *
 *
 * Includes all the routes for the home pages.
 * Seen Mainly by first time users and not-logged in Users.
 */
//var mysql      = require('mysql');
var express = require("express");
const session = require('express-session');
var passwordHash = require('password-hash');
var router = express.Router({ mergeParams: true });
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');
//const mailer = require("../routes/mailer");



app.use(session({ secret: 'sss1hhhhh', saveUninitialized: true, resave: true }));
var sess;



router.get('/', function(req, res) {

    // res.render('index');
    res.render('index');
}); //end of index route




router.get('/recruitform', function(req, res) {
// get recruitment position
var recPostion =  req.param("position");
//render recruitform
    
    res.render('recruitform',{recPostion:recPostion});
}); 


router.post('/recruitform', function(req, res) {
   //get for data
   
   var fullname = req.body.fullname;
   var email = req.body.email;
   var nID = req.body.nID;
   var address = req.body.address;
   var call_phone = req.body.phone_number;
   var position = req.body.Position;
   var education = req.body.education;
   var otherQ = req.body.otherQ;
   var abt_yourself = req.body.yourself;
   var refes = req.body.refes;

//open db connection
   var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'job_applicants'
});

// save data to db

var queryLine = "INSERT INTO applicants (fullname,email, nID,address ,call_phone,position," +
            "education,otherQ,abt_yourself,refes)" +
            " Values(?,?,?,?,?,?,?,?,?,?)";

        connection.query({
                sql: queryLine,
                values: [fullname,email, nID,address ,call_phone,position,education,otherQ,abt_yourself,refes]
            },
            function(error, results, fields) {
                if (error) {
                  console.log(error);
                    console.log("Register error " + error.code);
                    if (error.code === 'ER_DUP_ENTRY') {
                    }
                    //  throw error;
                    //  console.log(results.code);
                    // code: 'ER_DUP_ENTRY'
                    connection.end();
                    res.send(error.code);


                } else {
                    connection.end();
                    res.send(">ok");
                }//end of else




            });

       // res.render('recruitform',{recPostion:recPostion});
    });




    router.get('/login', function(req, res) {
        // get recruitment position
        var recPostion =  req.param("position");
        //render recruitform
            
            res.render('login');
    }); 

    router.post('/login', function(req, res) {
        // get recruitment position
        //var recPostion =  req.param("position");
        //render recruitform
            
            res.redirect('/hr-dash');
    }); 

    
    router.get('/hr-dash', function(req, res) {
            res.render('dashboard');
    });

    router.get('/applicants', function(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'job_applicants'
        });  


        connection.query({
            sql:"select * from applicants"
          },function (error, results, fields) {
    
            if(error){
              console.log("error getAllAcc");
              console.log(error);
              connection.end();
           res.send("failed");
            }else{
              var allusers = results;
              connection.end();
              res.render('applicants',{allusers:allusers});
             // resolve(searchResult);
    
        }
     });//end of query
        



           






    });






    


module.exports = router;
