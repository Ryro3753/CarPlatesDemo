var express = require("express");
const { detectBufferEncoding } = require("tslint/lib/utils");
var app = express()
var db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

app.get("/api/owners",(req,res,next) => {
    var sql = "select * from CarPlates"
    var params = []
    db.all(sql,params, (err, rows) => {
        if (err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
    })
});
});
app.get("/api/owner/:id",(req,res,next) => {
    var sql = "select * from CarPlates Where id = ?"
    var params = [req.params.id]
    db.all(sql,params, (err, row) => {
        if (err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
    })
});
});

app.post("/api/owner/",(req,res,next) => {

    var sql = "select * from CarPlates"
    var params = []
    db.all(sql,params, (err, rows) => {
        if (err){
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
    })
});
});

// Insert here other API endpoints

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
