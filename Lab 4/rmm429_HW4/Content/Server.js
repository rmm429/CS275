// Server.js
//Imports
var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
app.use(express.static("."));

//Module imports
require("./Home");
var Calculator = require("./Calculator");
var calc = new Calculator();
var Weather = require("./Weather");
var weat = new Weather();




//GET call to /index.html
app.get('/index.html', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /index.html");
	
	//Writing HTML specified by the file "index.html"
	fs.readFile('index.html', function(err, data) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	res.end();
  });
	
});




//GET call to /home
app.get('/home', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /home");
	
	//Calling the function "home()" and storing the response in the variable
	var home_html = home();
	
	//Send the variable back to whoever made the GET call
	res.send(home_html);
	
});





//GET call to /calc_render
app.get("/calc_render", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /calc_render");
	
	//Calling the function "render()" in the Calculator module and storing the response in the variable
	var calc_html = calc.render();

	//Send the variable back to whoever made the GET call
	res.send(calc_html);
	
});


//GET call to /calc_fact
app.get('/calc_fact', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /calc_fact");
	
	//Calling the function "computeFactorial()" in the Calculator module with parameter "req" and storing the response in the variable
	var calc_fact = calc.computeFactorial(req);
	
	//Send the variable back to whoever made the GET call
	res.send(calc_fact);
	
});


//GET call to /calc_sum
app.get('/calc_sum', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /calc_sum");
	
	//Calling the function "computeSummation()" in the Calculator module with parameter "req" and storing the response in the variable
	var calc_sum = calc.computeSummation(req);
	
	//Send the variable back to whoever made the GET call
	res.send(calc_sum);
	
});







//GET call to /weat_render
app.get("/weat_render", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /weat_render");
	
	//Calling the function "render()" in the Weather module and storing the response in the variable
	var weat_html = weat.render();
	
	//Send the variable back to whoever made the GET call
	res.send(weat_html);
	
});


//GET call to /weat_zip
app.get("/weat_zip", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /weat_zip");
	
	//Waiting for the "exit" case to be hit within the function "getZip()" in the Weather module
	weat.once('exit', function(msg){
		
		//Sending the response from the function once the "exit" case has been hit
		res.send(msg);
	});
	
	//Calling the function "getZip()" in the Weather module
	weat.getZip(); 
	
});


//GET call to /weat_get
app.get("/weat_get", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /weat_get");
	
	//Waiting for the "exit" case to be hit within the function "getWeather()" in the Weather module
	weat.once('exit', function(msg){
		
		//Sending the response from the function once the "exit" case has been hit
		res.send(msg);
	});
	
	//Calling the function "getWeather()" in the Weather module with parameter "req"
	weat.getWeather(req); 
	
});









//GET call with no specification (home page)
app.get('/', function (req,res){
	
	//Output to console that a connection was made and that there is a redirection to /index.html
	console.log("Connection made\nRedirecting to /index.html...")
	//Redirect to /index.html
	res.redirect('/index.html');
	
});


//Create the server at port 8080
app.listen(8080,function(){
	
	//Output to console that the server is running
	console.log('Server Running...');
	
});
