var express = require("express");
var router = express.Router({ mergeParams: true });
var app = express();
var http = require('http').Server(app);
var mysql = require('mysql');
var http = require('http').Server(app);

var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b899f683adb614',
    password: '39f6f8d3',
    database: 'heroku_16f305c472784d0'
})

// the index page needs to collect informaion from the database and use it to ppulate the pages starting
// with the adverts section
// con.query("SELECT name, address FROM customers", function (err, result, fields) to select column
//con.query("SELECT * FROM customers", function (err, result, fields) to select all
//
connection.connect(function(err) {
    connection.query('SELECT id FROM test WHERE id = 0', function(error, results, fields) {

        if (error) throw error;
        //.... incorrect email or password
        console.log(result);
    });
});

/* select the area to manipulate */
toArray