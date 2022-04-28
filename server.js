const express = require("express");
const bodyParser = require("body-parser");
const auth = require("./auth");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",function (request,response) {
    response.sendFile(__dirname + "/login.html")
});

app.post("/submit",async function (request, response) {
    console.log(`Hello ${request.body.username}`)
    let isAuth = await auth.login(request.body.username, request.body.password)
    response.send(isAuth ? "The user credential match with active directory" : "User credentials does not match with my records");
});

app.listen(3000, function (){
    console.log("Server started on port 3000");
});