const express = require('express');
// const router = express.Router();
const app= express()
const pg = require('pg');
const path = require('path');
var bodyparser=require('body-parser')
var urlencodedParser = bodyparser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, "../")));
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())
const connectionString = process.env.DATABASE_URL || 'postgres://mazendb:123456@localhost:5433/jerancomdb';


app.post('/user', urlencodedParser,(req, res, next) => {
   const results = [];
   console.log(req.body)
   // Grab data from http request
   const data = {username: req.body.username, password: req.body.password};
   // Get a Postgres client from the connection pool
   pg.connect(connectionString, (err, client, done) => {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({success: false, data: err});
     }
     // SQL Query > Insert Data
     client.query('INSERT INTO usertable(username, password) values($1, $2)',
     [data.username, data.password]);
     // SQL Query > Select Data
     const query = client.query('SELECT * FROM usertable ');
     // Stream results back one row at a time
     query.on('row', (row) => {
       results.push(row);
     });
     // After all data is returned, close connection and return results
     query.on('end', () => {
       
       return res.json(results);
     });
   });
 });

 app.get('/user', (req, res, next) => {
   const results = [];
   // Get a Postgres client from the connection pool
   pg.connect(connectionString, (err, client, done) => {
     // Handle connection errors
     if(err) {
       done();
       console.log(err);
       return res.status(500).json({success: false, data: err});
     }
     // SQL Query > Select Data
     const query = client.query('SELECT * FROM usertable ;');
     // Stream results back one row at a time
     query.on('row', (row) => {
       results.push(row);
     });
     // After all data is returned, close connection and return results
     query.on('end', () => {
       done();
       return res.json(results);
     });
   });
 });


 app.delete('/delete', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const user_id = req.body.user_id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Delete Data
      client.query('DELETE FROM usertable WHERE user_id=($1)', [user_id]);
      // SQL Query > Select Data
      var query = client.query('SELECT * FROM usertable');
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  });

  app.put('/putt', (req, res, next) => {
    const results = [];
    // Grab data from the URL parameters
    const user_id = req.body.user_id;
    // Grab data from http request
    const data = {username: req.body.username, password: req.body.password};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Update Data
      client.query('UPDATE usertable SET username=($1), password=($2) WHERE user_id=($3)',
      [data.username, data.password, user_id]);
      // SQL Query > Select Data
      const query = client.query("SELECT * FROM usertable");
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });

app.listen(3000,function(){
   console.log('server started on port 3000');
});