// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser= require('body-parser');
const app = express();
const { getHomePage} = require('./routes/index');
const game = require('./routes/game');
const game_session = require('./routes/game_session');
const config = require('./config');
const fs = require('fs');


// application port should come from config file
const port = config.port;


// database connection parameters should come from config file
const db = mysql.createConnection(config.db);


db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('Connected to database');

});

global.db = db;

// Verify that the DB tables don't exist and then create them TODO should pull from schema but having syntax errors
db.query('SHOW TABLES LIKE "Games";', function (error, results, fields) {
    if (error){
        throw error;
    } 
    // create and add data if they don't exist
    if (results.length == 0) {
        console.log('Database does not contain the table "Games" and "GameSessions", creating it now and filling with data');
        const schema = fs.readFileSync('./schema.sql', 'utf8');
        db.query(schema, function (error, results, fields) {
          if (error){
            throw error;
          } 
          console.log('Tables created and data added');
        });
    } 
    // if they do exist prompt user to kill the db and restart
    else {
        console.log('Database contains the table "Games" or "GameSessions" - NEED TO KILL THE DB AND RESTART IT');
    }
});

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/delete-game/:id', game.getDelete);
app.post('/delete-game/:id', game.postDelete);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);
app.get('/edit-game-session/:id', game_session.getEdit);
app.post('/edit-game-session/:id', game_session.postEdit);
app.get('/delete-game-session/:id', game_session.getDelete);
app.post('/delete-game-session/:id', game_session.postDelete);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
