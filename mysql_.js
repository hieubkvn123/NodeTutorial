const mysql = require("mysql")
const http = require("http")
const express = require('express')
const formidable = require('formidable')

const PORT = 8080

app = express()
const server = http.Server(app)

var DB_CONFIG = {
	'host' : 'localhost',
	'user' : 'root',
	'password' : '',
	'database' : 'nodetutorial'
}
const connection = mysql.createConnection(DB_CONFIG)
connection.connect(function(err){
	if(err){
		console.log("There is something wrong with database connection ... ")
		throw err
	}else{
		console.log("Database connection established ... ")
	}
})

app.get('/', function(req, res){
	res.sendFile("templates/mysql_.html", {root : __dirname})
})

app.post('/', function(req, res){
	var form = formidable.IncomingForm()
	form.parse(req, function(err, fields, files){
		if(err){
			console.log(err)
			throw err
		}else{
			var name = fields.name
			var student_id = fields.student_id
			var major = fields.major

			// console.log(fields.name)
			var sql = "INSERT INTO students VALUES ?"
			var values = [
				[mysql.AUTO_INCREMENT, name, student_id, major]
			]

			connection.query(sql, [values], function(err, results){
				if(err){
					console.log("Insert failed ... ")
					throw err
				}else{
					console.log("Data inserted ... ")
					res.redirect("/")
				}
			})
		}
	})
})

console.log("Server is listening on port " + PORT)
server.listen(PORT)
