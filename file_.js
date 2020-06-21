const formidable = require("formidable")
const express = require('express')
const http = require("http")
const fs = require('fs')

const PORT = 8080
const app = express()
const server = http.Server(app)

app.get("/", function(req, res){
	res.sendFile("templates/files_.html", {root:__dirname})
})

app.post("/", function(req, res){
	// check if the file exists
	if(!fs.existsSync("files/file_.txt")){
		// if not exists -> create file
        fs.mkdirSync("files") // make dir first
		fs.writeFile("files/file_.txt", "", function(err){
			if(err){
				console.log("Failed creating file ... ")
                throw err
			}else{
                console.log("Created file successfully ... ")
            }
		})
	}

    // done creating file, now insert information into the file
    var form = formidable.IncomingForm()
    form.parse(req, function(err, fields, files){
        var name = fields.name
        var student_id = fields.student_id
        var major = fields.major

        var str = name + "," + student_id + "," + major + "\n"
        
        // read to see if the file is empty
        fs.readFile("files/file_.txt", function(err, data){
            if(err){
                console.log("Error reading file ... ")
                throw err
            }else{
                if(data == ""){ // if the file is empty
                    // we use file writing operation
                    fs.writeFile("files/file_.txt", str, function(err){
                        if(err){
                            console.log("Failed writing file ...")
                            throw err
                        }else{
                            console.log("Data written to file ...")
                        }
                    })
                    console.log("Data written to file ... ")
                }else{ // file not empty we use append
                    fs.appendFile("files/file_.txt", str, function(err){
                        if(err){
                            console.log("Failed appending to file ...")
                            throw err
                        }else{
                            console.log("Data appended to file ...")
                        }
                    })
                    console.log("Data appended to file ... ")
                }
            }
        })

        res.sendFile("templates/files_.html", {root:__dirname})
    })
})

app.get("/read_file", function(req, res){
    // read file 'files/file_.txt' and return results to user
    fs.readFile('files/file_.txt', function(err, data){
        var data = (String) (data).replace("\n", "<br>")
        res.writeHead(200, {"Content-Type": 'text/html'})
        res.write(data)
        res.end()
    })
})

console.log("Server is listening on port " + PORT)
server.listen(PORT)

