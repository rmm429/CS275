// Weather.js

//Imports
var fs = require('fs');
var http = require('http');
var EventEmitter = require("events").EventEmitter;
var utils = require("util");

//Populating the variable "key" with the content of the text file "wundergroundkey.txt"
var key = fs.readFileSync('../wundergroundkey.txt','utf8');

//Creating the function weat()
function weat(){
	
	//Calling the EventEmitter
	EventEmitter.call(this);
}



//Creating the function "render()"
weat.prototype.render = function() {
	
	//Outputting to the console that the render function of Weather was called
	console.log("Weather Render");
	
	//Creating an empty string
	var str = ""
	
	//Filling the string with html content that contains Get Weather button
	str += "<center><button onClick=\"weat_zip()\">Get the Weather</button></center>";
	
	//Filling the string with html content that contains the empty div
	str += "<div id=\"display_weather\"></div>";
	
	//Returning the string
	return str;
	
};



//Creating the function getZip()
weat.prototype.getZip = function() {
	
	//Outputting to the console that the getZip function of Weather was called
	console.log("Weather Zip");
	
	//Creating a JSON with URL information
	var options = {
		host: "api.wunderground.com",
		path: "/api/" + key + "/geolookup/q/autoip.json"
	};
	
	//need otherwise emission within the response object with be from response object
	var self = this;
	
	//Creating an empty string
	var str = '';
	
	//Making an HTTP request to the URL specified by the JSON "options"
	http.request(options, function(response){
		
		//The data that is returned from the HTTP request
		response.on('data', function (chunk) {
			
			//Concatenating the string with the chunks of data
			str += chunk;
		});
		
		//Called when the HTTP request has finished
		response.on('end', function() {
			
			//Filling the variable "json" with the parsed contents of the string
			var json = JSON.parse(str);
			
			//Setting the variable loc_json to the value at the key location in json
			var loc_json = json.location;
				
			//Setting the variable zip_code to the value at the key zip in loc_json
			var zip_code = loc_json.zip;
			
			//Calling the "exit" case and seding "zip_code" as the content
			self.emit('exit',zip_code);
			
		});
		
	}).end();
	
};




//Creating the function getWeather() that has the parameter "req"
weat.prototype.getWeather = function(req) {
	
	
	//Ouptutting to the console that the getWeather function has been called
	console.log("Weather Get")
	
	//Getting the zip code from the parameter "req"
	var zip = req.query.zipcode;
	
	//Creating a JSON with URL information
	var options = {
		host: 'api.wunderground.com',
		path: '/api/' + key + "/hourly/q/" + zip + ".json"
	};
	
	//need otherwise emission within the response object with be from response object
	var self = this; 
	
	//Creating an empty string
	var str = '';
	
	//Creating an empty string named "html"
	var html = "";
	
	//Making an HTTP request to the URL specified by the JSON "options"
	http.request(options, function(response){
		
		//Concatenating the string with the chunks of data
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		//Called when the HTTP request has finished
		response.on('end', function() {
			
			//Filling the variable "json" with the parsed contents of the string
			var json = JSON.parse(str);
			
			//Setting the variable hourly_forecast_array to the value at the key hourly_forecast in json
			var hourly_forecast_array = json.hourly_forecast;

			//Placing a header into the string "html"
			html += ("<br><center><h3>" + "Weather for " + zip + "</h3></center>");

			//Going through each element in the array hourly_forecast_array
			for (i = 0; i < hourly_forecast_array.length; i++)
			{

				//Setting the variable hourly_forecast_info to the value at the index i in the array hourly_forecast_array
				var hourly_forecast_info = hourly_forecast_array[i];

				//Setting the variable time_date_info to the value at the key FCTTIME in hourly_forecast_info
				var time_date_info = hourly_forecast_info.FCTTIME;

				//Setting the variable time_date_info_string to the value at the key pretty in time_date_info
				var time_date_info_string = time_date_info.pretty;

				//Placing the String time_date_info_string into the string "html"
				html += ("<center>" + time_date_info_string + "</center>");

				//Setting the variable temp_info to the value at the key temp in hourly_forecast_info
				var temp_info = hourly_forecast_info.temp;

				//Setting the variable temp_info_string to the value at the key english in temp_info concatenated with "°F"
				var temp_info_string = (temp_info.english) + "°F";

				//Setting the variable condition to the value at the key condition in hourly_forecast_info
				var condition = hourly_forecast_info.condition;

				//Setting the variable temp_condition_string to the concatenation of temp_info_string and condition separated by a comma
				var temp_condition_string = temp_info_string + ", " + condition;

				//Placing the String temp_condition_string into the string "html"
				html += ("<center>" + temp_condition_string + "</center>");

				//Setting the variable condition_img to the value at the key icon_url in hourly_forecast_info
				var condition_img = hourly_forecast_info.icon_url;

				//Placing the String condition_img into the string "html"
				html += ("<center>" + "<img src=\"" + condition_img + "\">" + "</center><br>");

			}
			
			//Calling the "exit" case and seding "html" as the content
			self.emit('exit',html);
			
		});
		
	}).end();
	
	
};




utils.inherits(weat,EventEmitter);

//Exporting the contents of weat
module.exports = weat;