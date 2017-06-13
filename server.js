// set up ========================================================================================================
// get all the tools we need
var express = require("express");
var app = express();
var port = 5000;
var http = require("http");

var morgan = require("morgan");
var model = require("./model");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var cors = require("cors");

// configuration ==============================================================
app.set('port', process.env.PORT || port);
process.env.JWT_SECRET = "applicationcapoupascap";

app.use(bodyParser.json({limit: '50mb'})); // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));

// options ====================================================================
app.use(morgan('dev')); // log every request to the console
app.use(cors({credentials: true, origin: true}));
//app.use(function (req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
//    res.setHeader('Access-Control-Allow-Credentials', 'true');
//    next();
//});

//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", req.headers.origin);
//    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//    res.header('Access-Control-Allow-Credentials', 'true');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//    next();
//});

// models init =================================================================
model.sequelize.sync(/*{force: true}*/).then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        require('./route')(app, model, jwt);
        require(__dirname + "/DAL/Challenge")(app, model, jwt);
        require(__dirname + "/DAL/User")(app, model, jwt);
        //require(__dirname + "/DAL/Movement")(app, model, jwt);
    });
});