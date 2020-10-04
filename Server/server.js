const express = require("express");
const { detectBufferEncoding } = require("tslint/lib/utils");
const app = express()
const db = require("./database.js")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server port
const HTTP_PORT = 8000
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
    res.json({ "message": "Ok" })
});

app.get("/api/owners", (req, res) => {
    const sql = "select * from CarPlates"
    const params = []

    // search
    if (req.params.search) {
        sql +=" where owner like '%?%' or carPlate like '%?%'";
        params.push(req.params.search);   
    }

    // for pagination
    if (req.params.skip && req.params.take) {
        sql += " limit ? skip ?"
        params.push(req.params.skip)
        params.push(req.params.take)
    }

    // order by
    if (req.params.orderBy) {
        sql += " order by " + req.params.orderBy;

        if (req.params.desc) {
            sql += " desc"
        }
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});
app.get("/api/owner/:id", (req, res) => {
    const sql = "select * from CarPlates Where id = ?"
    const params = [req.params.id]
    db.all(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});

app.post("/api/owner/", (req, res) => {
    const errors = []
    if (!req.body.owner) {
        errors.push("No Owner Name specified")
    }
    if (!req.body.carPlate) {
        errors.push("No Car Plate specified")
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    const data = {
        owner: req.body.owner,
        carPlate: req.body.carPlate,
    }
    const sql = 'Insert into CarPlates(owner, carPlate) VALUES (?,?)'
    const params = [data.owner, data.carPlate]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
});

app.patch("/api/owner/:id", (req, res) => {
    const data = {
        owner: req.body.owner,
        carPlate: req.body.carPlate,
    }
    const sql = 'Update CarPlates SET owner = ?, carPlate = ? Where id = ?'
    const params = [data.owner, data.carPlate, req.params.id]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
        })
    });
});

app.delete("/api/owner/:id", (req, res) => {
    db.run(
        'DELETE FROM CarPlates WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.json({ "message": "deleted", changes: this.changes })
        });
})


app.use(function (req, res) {
    res.status(404);
});
