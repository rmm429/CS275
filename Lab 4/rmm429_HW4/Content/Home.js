// Home.js

//Imports
var fs = require('fs');
var http = require('http');

//Creating the function "home()"
home = function() {
	
	//Outputting to console that the home button was clicked
	console.log("Home button clicked...");
	
	//Creating an empty string
	var str = "";
	
	//Filling the string with html content with the instructions on how to use the web page
	str += "<center><h2>Instructions</h2></center>";
	str += "<center><p>To access content, click the \"Menu\" button in the top left corner, which will open a menu.</p></center>";
	str += "<center><p>There are four buttons in the menu: \"Home,\" \"Calculator,\" \"Weather,\" and \"Close Menu.\"</p></center>";
	str += "<center><p>The \"Home\" button will populate the page with the instructions you are reading currently.</p></center>";
	str += "<center><p>The \"Calculator\" button will populate the page with a calcuator to caculate the Factorial or Summation of a provied positive integer.</p></center>";
	str += "<center><p>The \"Weather\" button will populate the page with the hourly weather in your current location.</p></center>";
	str += "<center><p>The \"Close Menu\" button will close the menu and will fully display whatever content was already on the page.</p></center>";
	
	//Returning the string
	return str;
}