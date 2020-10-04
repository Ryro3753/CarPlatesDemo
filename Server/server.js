const express = require("express");
const app = express()
const db = require("./database.js")
const cors = require('cors')

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  
  app.listen(80, function () {
    console.log('CORS-enabled web server listening on port 80')
  })

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
    let sql = "select id, owner, carPlate from CarPlates"
    let params = []
    const search = req.query.search;
    // search
    if (search) {
        sql = sql + " where owner like '%"+req.query.search+"%' or carPlate like '%"+req.query.search+"%' ";

    }

    // for pagination
    if (req.params.skip && req.params.take) {
        sql += " limit ? skip ?"
        params.push(req.params.skip)
        params.push(req.params.take)
    }

    // order by
    const orderBy = req.query.orderBy;

    if (orderBy) {
        sql += " order by " + req.query.orderBy;
        const desc = req.query.desc;

        if (desc) {
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
