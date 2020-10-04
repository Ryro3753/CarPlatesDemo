const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const dbPath = path.resolve(__dirname, 'CarPlate.db')


// open database in memory
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});
module.exports = db;

/*
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(row.name + ' - ' + row.plate);
    });
    });

*/
//db.run('CREATE TABLE CarPlates(id INTEGER PRIMARY KEY AUTOINCREMENT ,owner text, carPlate text)');    //I created table in here

//let sql = 'SELECT  owner name, carPlate plate FROM CarPlate ORDER BY name';



/*
db.run('INSERT INTO CarPlates(owner, carPlate) VALUES(?, ?)',  ['Jeff Greene','14 JT 7931'], function(err) {  //I seed data in here
    if (err) {
      return console.log(err.message);
    } console.log('Row was added to the table ');
});
*/

/*
// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/