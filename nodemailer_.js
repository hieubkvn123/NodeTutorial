const express = require("express")
const http = require("http")
const nodemailer = require('nodemailer')

var app = express()
var server = http.Server(app)
const PORT = 8080

app.get("/", function(req, res){
    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
            user : 'yourmail@example.gmail.com',
            pass : '****'
        }
    })

    var mailOptionsText = {
        from : 'yourmail@example.gmail.com',
        to : 'receiver_1@gmail.com',
        subject : 'Sending mail using nodejs',
        text : 'That was easy'
    }

    var mailOptionsHtml = {
        from : 'yourmail@example.gmail.com',
        to : 'receiver_2@gmail.com',
        subject : 'Sending mail using nodejs (html)',
        html : '<h1>That was easy</h1>'
    }

    transporter.sendMail(mailOptionsText, function(err, info){
        if(err){
            console.log(err)
            throw err
        }else{
            console.log("Email sent : " + info.response)
        }
    })

    transporter.sendMail(mailOptionsHtml, function(err, info){
        if(err){
            console.log(err)
            throw err
        }else{
            console.log("Email sent : " + info.response)
        }
    })

    res.writeHead(200, "Content-Type", "text/html")
    res.write("Email sent")
    res.end()
})

console.log("Server is listening on port " + PORT)
server.listen(PORT)
