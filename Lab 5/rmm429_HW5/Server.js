// Server.js
//Imports
var express = require('express');
var fs = require('fs');
var http = require('http');
var app = express();
app.use(express.static("."));

var mysql = require("mysql");

//Module imports
require("./Home");




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
	
	//Outputting to console that the home button was clicked
	console.log("Home button clicked...");
	
	//Creating an empty string
	var str = "";
	
	//Filling the string with html content with the instructions on how to use the web page
	str += "<center><h2>Instructions</h2></center>";
	str += "<center><p>To access content, click the \"Menu\" button in the top left corner, which will open a menu.</p></center>";
	str += "<center><p>There are four buttons in the menu: \"Home,\" \"Display,\" \"Search,\" and \"Close Menu.\"</p></center>";
	str += "<center><p>The \"Home\" button will populate the page with the instructions you are reading currently.</p></center>";
	str += "<center><p>The \"Display\" button will populate the page with a drop-down box that lists the tables you can select to display.</p></center>";
	str += "<center><p>The \"Search\" button will populate the page with the drop-down box that lists the students, along with a drop-down box that lists term/year to display from.</p></center>";
	str += "<center><p>The \"Close Menu\" button will close the menu and will fully display whatever content was already on the page.</p></center>";
	
	//Send the variable back to whoever made the GET call
	res.send(str);
	
});





//GET call to /display_render
app.get("/display_render", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /display_render");
	
	//Outputting to the console that the render function of Display was called
	console.log("Display render");
	
	//Creating an empty string
	var str = "";
	
	//Filling the string with html content that contains the display selections
	str += "<center>Select a table to display:</center><br><center><select id=\"display_select\"><option value=\"student\">STUDENT</option><option value=\"course\">COURSE</option><option value=\"grades\">GRADES</option></select></center><br><center><button onClick=\"display_select()\">Display</button></center>";
	
	//Filling the string with html content that contains the empty div
	str += "<div id=\"display_table\"></div>";

	//Send the variable back to whoever made the GET call
	res.send(str);
	
});


//GET call to /dispaly_students
app.get('/display_student', function (req,res){
	
	table = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_student");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Student");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT * from STUDENT", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Birth Date</th><th>Major</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				table += "<th>" + rows[i].studentID +"</th>";
				table += "<th>" + rows[i].firstName +"</th>";
				table += "<th>" + rows[i].lastName +"</th>";
				table += "<th>" + rows[i].birth +"</th>";
				table += "<th>" + rows[i].major +"</th>";
				table += "</tr>";
				
			};
		
			table += "</table>";
		
			res.send(table)
		
	});
	
});

//GET call to /dispaly_course
app.get('/display_course', function (req,res){
	
	table = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_course");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Course");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT * from COURSE", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Course ID</th><th>Course Description</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				table += "<th>" + rows[i].courseID +"</th>";
				table += "<th>" + rows[i].courseDesc +"</th>";
				table += "</tr>";
				
			};
		
			table += "</table>";
		
			res.send(table)
		
	});
	
});

//GET call to /dispaly_grades
app.get('/display_grades', function (req,res){
	
	table = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_grades");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Grades");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT * from GRADES", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Course ID</th><th>Student ID</th><th>Term/Year</th><th>Grade</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				table += "<th>" + rows[i].courseID +"</th>";
				table += "<th>" + rows[i].studentID +"</th>";
				table += "<th>" + rows[i].termYear +"</th>";
				table += "<th>" + rows[i].grade +"</th>";
				table += "</tr>";
				
			};
		
			table += "</table>";
		
			res.send(table)
		
	});
	
});

//GET call to /search_render
app.get("/search_render", function (req,res){
	
	//Output to console that a connection was made
	console.log("Connection made to /search_render");
	
	//Outputting to the console that the render function of Display was called
	console.log("Search render");
	
	//Creating an empty string
	var str = "";
	
	//Filling the string with html content that contains the display selections
	str += "<center>Select a student:</center><br><center><select id=\"search_select\"><option value=\"rmm429\">rmm429</option><option value=\"abc123\">abc123</option><option value=\"xyz890\">xyz890</option></select></center><br><center><button onClick=\"search_select()\">Select Student</button></center>";
	
	//Filling the string with html content that contains the empty div
	str += "<div id=\"search_term\"></div>";
	
	//Filling the string with html content that contains the empty div
	str += "<div id=\"search_table\"></div>";

	//Send the variable back to whoever made the GET call
	res.send(str);
	
});


//GET call to /dispaly_term_rmm429
app.get('/display_term_rmm429', function (req,res){
	
	html = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_term_rmm429");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Term rmm429");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT termYear from GRADES WHERE studentID = 'rmm429'", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			var term_array = new Array();
			
			console.log("Successful query to database");
			
			html += "<br><br><center>Select a term/year:<br><br><select id=\"term_select\">";
			
			for (var i = 0; i < rows.length; i++) {
				
				term_array.push(rows[i].termYear)
				
			}
		
			var unique_term_array = term_array.filter(function(elem, index, self) {
    			return index == self.indexOf(elem);
			})
			
			for (var i = 0; i < unique_term_array.length; i++) {
				
				html += "<option value=\"" + unique_term_array[i] + "\">" + unique_term_array[i] + "</option>";
			}
			
			
			html += "</select></center><br><center><button onClick=\"display_table_rmm429()\">Select Term</button></center>";
		
			res.send(html);
		
	});
	
});


//GET call to /dispaly_term_abc123
app.get('/display_term_abc123', function (req,res){
	
	html = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_term_abc123");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Term abc123");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT termYear from GRADES WHERE studentID = 'abc123'", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			var term_array = new Array();
			
			console.log("Successful query to database");
			
			html += "<br><br><center>Select a term/year:<br><br><select id=\"term_select\">";
			
			for (var i = 0; i < rows.length; i++) {
				
				term_array.push(rows[i].termYear)
				
			}
		
			var unique_term_array = term_array.filter(function(elem, index, self) {
    			return index == self.indexOf(elem);
			})
			
			for (var i = 0; i < unique_term_array.length; i++) {
				
				html += "<option value=\"" + unique_term_array[i] + "\">" + unique_term_array[i] + "</option>";
			}
			
			
			html += "</select></center><br><center><button onClick=\"display_table_abc123()\">Select Term</button></center>";
		
			res.send(html);
		
	});
	
});


//GET call to /dispaly_term_abc123
app.get('/display_term_xyz890', function (req,res){
	
	html = ""
	
	//Output to console that a connection was made
	console.log("Connection made to /display_term_xyz890");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Term xyz890");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});

	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	con.query("SELECT termYear from GRADES WHERE studentID = 'xyz890'", function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			var term_array = new Array();
			
			console.log("Successful query to database");
			
			html += "<br><br><center>Select a term/year:<br><br><select id=\"term_select\">";
			
			for (var i = 0; i < rows.length; i++) {
				
				term_array.push(rows[i].termYear)
				
			}
		
			var unique_term_array = term_array.filter(function(elem, index, self) {
    			return index == self.indexOf(elem);
			})
			
			for (var i = 0; i < unique_term_array.length; i++) {
				
				html += "<option value=\"" + unique_term_array[i] + "\">" + unique_term_array[i] + "</option>";
			}
			
			
			html += "</select></center><br><center><button onClick=\"display_table_xyz890()\">Select Term</button></center>";
		
			res.send(html);
		
	});
	
});


//GET call to /dispaly_term_rmm429
app.get('/display_table_rmm429', function (req,res){
	
	table = "";
	
	term = req.query.term;
	
	//Output to console that a connection was made
	console.log("Connection made to /display_table_rmm429");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Table rmm429");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});
	
	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	query_string = "SELECT GRADES.studentID, STUDENT.firstName, STUDENT.lastName, GRADES.termYear, COURSE.courseID, COURSE.courseDesc, GRADES.grade FROM STUDENT, COURSE, GRADES WHERE (GRADES.studentID = 'rmm429') AND (GRADES.termYear = \'" + term + "\') AND (STUDENT.studentID = GRADES.studentID) AND (COURSE.courseID = GRADES.courseID)"
	
	con.query(query_string, function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Term/Year</th><th>Course ID</th><th>Description</th><th>Grade</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].firstName + "</th>";
				table += "<th>" + rows[i].lastName + "</th>";
				table += "<th>" + rows[i].termYear + "</th>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].courseDesc + "</th>";
				table += "<th>" + rows[i].grade + "</th>";
				
				table += "</tr>";
				
				
			}
		
			table += "</table>"
			
			res.send(table);
		
	});
	
	
	
	
});


//GET call to /dispaly_term_rmm429
app.get('/display_table_abc123', function (req,res){
	
	table = "";
	
	term = req.query.term;
	
	//Output to console that a connection was made
	console.log("Connection made to /display_table_abc123");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Table abc123");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});
	
	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	query_string = "SELECT GRADES.studentID, STUDENT.firstName, STUDENT.lastName, GRADES.termYear, COURSE.courseID, COURSE.courseDesc, GRADES.grade FROM STUDENT, COURSE, GRADES WHERE (GRADES.studentID = 'abc123') AND (GRADES.termYear = \'" + term + "\') AND (STUDENT.studentID = GRADES.studentID) AND (COURSE.courseID = GRADES.courseID)"
	
	con.query(query_string, function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Term/Year</th><th>Course ID</th><th>Description</th><th>Grade</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].firstName + "</th>";
				table += "<th>" + rows[i].lastName + "</th>";
				table += "<th>" + rows[i].termYear + "</th>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].courseDesc + "</th>";
				table += "<th>" + rows[i].grade + "</th>";
				
				table += "</tr>";
				
				
			}
		
			table += "</table>"
			
			res.send(table);
		
	});
	
	
	
	
});


//GET call to /dispaly_term_rmm429
app.get('/display_table_xyz890', function (req,res){
	
	table = "";
	
	term = req.query.term;
	
	//Output to console that a connection was made
	console.log("Connection made to /display_table_xyz890");
	
	//Outputting to the console that the computeFactorial function of Calculator was called
	console.log("Display Table xyz890");
	
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "rmm429_cs275",
		database: "HW5"
	});
	
	con.connect(function(err) {
		
		if (err) {
			console.log("Error connecting to database");
		}
		else {
			console.log("Database successfully connected");
		}
	});
	
	query_string = "SELECT GRADES.studentID, STUDENT.firstName, STUDENT.lastName, GRADES.termYear, COURSE.courseID, COURSE.courseDesc, GRADES.grade FROM STUDENT, COURSE, GRADES WHERE (GRADES.studentID = 'xyz890') AND (GRADES.termYear = \'" + term + "\') AND (STUDENT.studentID = GRADES.studentID) AND (COURSE.courseID = GRADES.courseID)"
	
	con.query(query_string, function(err,rows,fields) {
		
		if (err)
			
			console.log('Error during query processing');
		else
			
			console.log("Successful query to database");
		
			table += "<br><table width=\"100%\"><tr><th>Student ID</th><th>First Name</th><th>Last Name</th><th>Term/Year</th><th>Course ID</th><th>Description</th><th>Grade</th></tr>";
		
			for (var i = 0; i < rows.length; i++) {
				
				table += "<tr>";
				
				table += "<th>" + rows[i].studentID + "</th>";
				table += "<th>" + rows[i].firstName + "</th>";
				table += "<th>" + rows[i].lastName + "</th>";
				table += "<th>" + rows[i].termYear + "</th>";
				table += "<th>" + rows[i].courseID + "</th>";
				table += "<th>" + rows[i].courseDesc + "</th>";
				table += "<th>" + rows[i].grade + "</th>";
				
				table += "</tr>";
				
				
			}
		
			table += "</table>"
			
			res.send(table);
		
	});
	
	
	
	
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
