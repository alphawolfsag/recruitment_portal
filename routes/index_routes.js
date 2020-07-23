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


function mapSymbol(sym) {
switch(sym){
    case 'A': return 6;break;
    case 'B': return 5;break;
    case 'C': return 4;break;
    case 'D': return 0;break;
    case 'E': return 0;break;
    case 'F': return 0;break;
}
    
}

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


//set prerequistes and send email for confirmation
   // 17<age<30
   var age = req.body.age;
   var agePoints;
   if(age<=30 && age>=17){
    agePoints = 31 - age;//score out of 13
   }else{
    agePoints = 0;
   }
   var numOlevel = req.body.numOlevel;
   var oPointOveral;//score out of max o subjects is 12
   if(numOlevel<5){
    oPointOveral =0;
   }else{
    oPointOveral = numOlevel; 
   }
  
   var mathPass = req.body.mathPass;//score max 6
   var mathPassPoints = mapSymbol(mathPass);

   var engPass = req.body.engPass;//score max 6
   var engPassPoints = mapSymbol(engPass);

   var sciencePass = req.body.sciencePass;//score max 6
   var sciencePassPoints = mapSymbol(sciencePass)
  
   //max for this is 43
var totalScore = agePoints + oPointOveral + mathPassPoints + engPassPoints + sciencePassPoints;
var totalPercent = Math.ceil((totalScore/43) * 100);

    



//open db connection
   var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'job_applicants'
});

// save data to db

var queryLine = "INSERT INTO applicants (fullname,email,age,nID,address ,call_phone,position," +
            "points_acceptable,education,otherQ,abt_yourself,refes)" +
            " Values(?,?,?,?,?,?,?,?,?,?)";

        connection.query({
                sql: queryLine,
                values: [fullname,email, nID,address ,call_phone,position,totalPercent,education,otherQ,abt_yourself,refes]
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

    router.get('/send/:email', function(req, res) {
       var email = req.params.email;

       try { 

        const html = `Hi there,
        <br/>
      <h1>  Thank you for sending your application form!</h1>

          <br/><br/>
      <h3>  Please verify your CV using this email Use the Toke: </h3>


        <br/><br/>
         Have a pleasant day.`;

        //         // Send email
        //        mailer.sendEmails('clivemagasu@gmail.com', req.body.email, 'Email Verification', html);


        var transporter = nodemailer.createTransport({
            service: 'gmail',
               auth: {
                      user: 'panoapa12@gmail.com',
                      pass: 'panoapa256'
                  }
              });

              const mailOptions = {
                    from: 'panoapa12@gmail.com', // sender address
                    to: email , // list of receivers
                    subject: 'Email Verification', // Subject line
                    html: html// plain text body
                  };

                  transporter.sendMail(mailOptions, function (err, info) {
                     if(err){
                        console.log("Error in Sending Email: "+err);
                        connection.end();
                        res.send(">email failed");
                     }
                     else{
                        console.log("Email Sent !!!: "+info);
                        console.log("Registration Done for : " + req.body.email + " Please check your email");
                        console.log(results.message);
                        connection.end();
                        res.send(">ok");
                     }

                  });

            }//end of else


       } catch (error) {
        console.log("Function failed");
        }


        res.render('dashboard');
    });




    


module.exports = router;
