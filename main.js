var http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");

//var routes = require("./routes");
//var setUpPassport = require("./setuppassport");

var app = express();

//app.set("port", process.env.PORT || 3000);

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

var staticPath = path.join(__dirname, "/css");
app.use(express.static(staticPath));
var bootstrapPath = path.join(__dirname, "/node_modules/bootstrap/dist");
app.use('/dist',express.static(bootstrapPath));
var bootstrapPath = path.join(__dirname, "/node_modules/jquery/dist");
app.use('/jquery',express.static(bootstrapPath));

var publicPath = path.resolve(__dirname, "img");
app.use("/img", express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(session({
	secret: "TRV0Jd=HY#!F!Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}));

app.get("/", function(request, response){
	response.render("index");
});

app.get('/content/service', function(request, response){
	response.render('service');
});

app.use(function(err, req, res, next){
	console.error(err);
	next(err);
});
/*
app.listen(app.get("port"), function(){
	console.log("Server started on port " + app.get("port"));
});
*/
/*http.createServer(app).listen(3000, function() {
	console.log("Sweets's prtfolio started on port 3000");
})*/