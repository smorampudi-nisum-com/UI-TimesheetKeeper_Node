//initializing node modules

var mysql = require('mysql');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors =  require("cors");

app.use(cors());

//setting up the server

var server =  app.listen(process.env.PORT || 1279, function(){
	var port = server.address().port;
	console.log("app now running");
});

app.get('/', (req,res) => {
	res.send("smorampudi");
});

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "welcome",
	database: "ehour"
});

con.connect(function(err){
	if(err) throw err;
	console.log("connected");
	con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
})
//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json' }));
//get API

app.get("/users", function(req, res){
	console.log(req);
	con.query("SELECT * FROM users", function (err, result, fields){
		if (err) throw err;
		console.log(result);
		res.send(JSON.stringify(result));
	});
	//executeQuery (res, query);
});
// API to get an individual record of USER
app.get('/users/:id', function(req, res){
	con.query('select * from users where USER_ID=?',[req.params.id], function (err, result, fields){
		if(err) throw err;
		res.send(JSON.stringify(result));
	});
});

//API call to create new record in to the database
/*app.post('/users', function(req, res){
	//var postData = req.body;
	var postData = {
		"USER_ID":12700,
		"USERNAME":"samchai",
		"PASSWORD":"abcd",
		"FIRST_NAME":"samantha",
		"LAST_NAME":"chai akkineni",
		"DEPARTMENT_ID":null,
		"EMAIL":null,
		"SALT":29000,
		"ACTIVE":"Y",
		"COUNTRY_ID":2,
		"WORKLOCATION":1,
		"EMPLOYEE_TYPE":1,
		"APPROVER":112318
	}

	con.query('insert into users set?', postData, function(err,result,fields){
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});*/

app.post('/users', function (req, res) {
var postData = req.body;
//console.log(postData);
//con.query('INSERT INTO `USERS` (`USER_ID`, `USERNAME`, `PASSWORD`,`FIRST_NAME`, `LAST_NAME`, `DEPARTMENT_ID`, `EMAIL`, `SALT`,`ACTIVE`, `WORKLOCATION`,`EMPLOYEE_TYPE`, `APPROVER`) VALUES ? ',postData, function(err,result,fields)
con.query('INSERT INTO `USERS` SET ?', postData, function (err, result, fields) {
//{
if (err) throw err;
res.end(JSON.stringify(result));
});
});

//rest api to update record into mysql database
app.put('/users', function (req, res) {
   con.query('UPDATE `USERS` SET `USER_ID`=?,`USERNAME`=?,`PASSWORD`=? where `FIRST_NAME`=?', [req.body.USER_ID,req.body.USERNAME, req.body.PASSWORD, req.body.FIRST_NAME], function (err, result, fields) {
   if (err) throw err;
   res.end(JSON.stringify(result));
 });
});

app.delete('/Users', function (req, res) {
   console.log(req.body);
   con.query('DELETE FROM `USERS` WHERE `id`=?', [req.body.id], function (err, result, fields) {
   if (err) throw err;
   res.end('Record has been deleted!');
 });
});