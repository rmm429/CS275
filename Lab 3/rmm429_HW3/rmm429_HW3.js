//File: rmm429_HW3.js
//Purpose: To create a Nodejs server that will display an HTML page that prompts for input and will either generate the factorial or summation of that input value
//Author: Richard Mangerie
//Last Updated: 07/30/2017

//Imports
var express = require('express');
var fs = require('fs');
var http = require('http');

//Var "app" that uses express
var app = express();

//GET call to /rmm429_HW3.html
app.get('/rmm429_HW3.html', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /rmm429_HW3.html");
	
	//Writing HTML specified by the file "rmm429_HW3.html"
	fs.readFile('rmm429_HW3.html', function(err, data) {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	res.end();
  });
});

//GET call to /fact
app.get('/fact', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /fact");
	
	//Getting the input value from the JSON sent via AJAX call
	var input = parseInt(req.query.input);
	//A copy variable of the input value
	var one_less = parseInt(req.query.input);
	//Variable "answer" that is initialized to 1
	var answer = 1;
	
	//If the input value is 0
	if (input == 0)
	{
		//The answer is 1
		answer = 1;
	}
	//If the input value is greater than 0
	else
	{
		//While the value of "one_less" is greater than 0
		while (one_less > 0)
		{
			//Multiply the value of "answer" by the value of "one_less" and store it in "answer"
			answer *= one_less;
			//Decrease the value of "one_less" by 1
			one_less -= 1;
		}
	}
	
	//Send the factorial answer back to whoever made the GET call
	res.send("Factorial of " + input + ": " + answer);
	
});

//GET call to /sum
app.get('/sum', function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /sum");
	
	//Getting the input value from the JSON sent via AJAX call
	var input = parseInt(req.query.input);
	//A copy variable of the input value
	var one_less = parseInt(req.query.input);
	//Variable "answer" that is initialized to 0
	var answer = 0;
	
	//While the value of "one_less" is greater than or equal to 0
	while (one_less >= 0)
	{
		//Add the value of "one_less" to the value of "answer" and store it in "answer"
		answer += one_less;
		//Decrease the value of "one_less" by 1
		one_less -= 1;
	}
	
	//Send the summation answer back to whoever made the GET call
	res.send("Summation of " + input + ": " + answer);
	
});

//GET call with no specification (home page)
app.get('/', function (req,res){
	
	//Output to console that a connection was made and that there is a redirection to /rmm429_HW3.html
	console.log("Connection made\nRedirecting to /rmm429_HW3.html...")
	//Redirect to /rmm429_HW3.html
	res.redirect('/rmm429_HW3.html');
	
})

//Create the server at port 8080
app.listen(8080, function () {
	
	//Output to console that the server is running
    console.log('Node server is running...');
	
});