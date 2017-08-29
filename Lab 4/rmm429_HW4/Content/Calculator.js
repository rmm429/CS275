//Calculator.js

//Imports
var fs = require('fs');
var http = require('http');
var EventEmitter = require("events").EventEmitter;
var utils = require("util");


//Creating the function "calc()"
function calc(){
	
	//Calling the EventEmitter
	EventEmitter.call(this);
}


//Creating the function "render()"
calc.prototype.render = function() {
	
	//Outputting to the console that the render function of Calculator was called
	console.log("Calculator render");
	
	//Creating an empty string
	var str = "";
	
	//Filling the string with html content that contains the calculator
	str += "<h2>Calculator</h2><input type=\"text\" id=\"n\" style=\"width: 225px\" placeholder=\"Enter a non-negative integer...\"><br><br><select id =\"fact_sum\"><option value=\"fact\">Factorial</option><option value=\"sum\">Summation</option></select><br><br><button id=\"calc\"onClick=\"fact_or_sum()\">Calculate</button>";
	
	//Filling the string with html content that contains the empty div
	str += "<div id=\"calc_answer\"></div>";
	
	//Returning the string
	return str;
};




//Creating the function "computeFactorial" with parameter "req"
calc.prototype.computeFactorial = function(req) {
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Calculator Factorial");
	
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
	return ("Factorial of " + input + ": " + answer);
	
	
};


//Creating the function "computeSummation" with parameter "req"
calc.prototype.computeSummation = function(req) {
	
	//Outputting to the console that the computeSummation function of Calculator was called
	console.log("Calculator Summation");
	
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
	return ("Summation of " + input + ": " + answer);
	
};



utils.inherits(calc,EventEmitter);

//Exporting the contents of calc
module.exports = calc;