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
        db.query("CREATE TABLE Games (game_id INT NOT NULL AUTO_INCREMENT,game_name VARCHAR(255) NOT NULL,game_image LONGBLOB,PRIMARY KEY (game_id));", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Games created');
        });
        db.query("CREATE TABLE GameSessions (game_session_id INT NOT NULL AUTO_INCREMENT,game_id INT NOT NULL,game_session_start_date DATETIME NOT NULL,PRIMARY KEY (game_session_id),FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE);", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table GameSessions created');
        });
        db.query("INSERT INTO Games (game_name, game_image) VALUES ('Monopoly', 'https://toppng.com/uploads/preview/monopoly-collect-win-transparent-background-monopoly-guy-11563049600zctdjngr0t.png');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game recorded added');
        });
        db.query("INSERT INTO Games (game_name, game_image) VALUES ('Othello', 'https://png.pngtree.com/png-vector/20210912/ourlarge/pngtree-go-othello-gomoku-png-image_3913163.jpg');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game recorded added');
        });
        db.query("INSERT INTO Games (game_name, game_image) VALUES ('Catan', 'https://p7.hiclipart.com/preview/692/115/598/catan-boardgamegeek-dice-board-game-dice-thumbnail.jpg');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game recorded added');
        });
        db.query("INSERT INTO Games (game_name, game_image) VALUES ('Cards Against Humanity', 'https://www.vhv.rs/dpng/d/465-4655968_cards-against-humanity-png-cards-against-humanity-packaging.png');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game recorded added');
        });
        db.query("INSERT INTO Games (game_name, game_image) VALUES ('Ticket to Ride', 'https://banner2.cleanpng.com/20180629/hsk/kisspng-days-of-wonder-ticket-to-ride-series-board-game-pa-product-box-5b36f24fd48354.8126638415303276318705.jpg');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-01 08:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 09:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 10:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-01 11:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-01 12:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-08 08:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-08 09:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (3, '2023-04-08 10:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-08 11:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
        });
        db.query("INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-08 12:00:00');", function (error, results, fields) {
            if (error){
                throw error;
            } 
            console.log('Table Game Session recorded added');
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
app.use(bodyParser.urlencoded({ extended: false }));

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
