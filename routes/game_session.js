module.exports = {
	// renders add-game-session.ejs when `Add Game Session` button is clicked on index.ejs
	getAdd: (req, res) => {
		// query list of available games to choose from that go with the game session
		let query = 'SELECT game_id,game_name FROM Games ORDER BY game_name ASC';

		db.query(query, (err, results) => {
			if (err) {
				throw err;
			}
			console.log(`Attempting to add a game session`);
			res.render('add-game-session.ejs', {
				title: 'Board Games | Add Game Session',
				games: results
			});
		});
	},
	// renders edit-game-session.ejs when `Edit` button is clicked on Game Session col of index.ejs
	getEdit: (req, res) => {
	    let id = req.params.id;

	    // query to get game_session info for the line that the Edit button was pressed
	    let query = 'SELECT GameSessions.game_session_id, GameSessions.game_id, GameSessions.game_session_start_date, Games.game_name FROM GameSessions JOIN Games ON GameSessions.game_id = Games.game_id WHERE game_session_id = ?';

	    db.query(query, [id], (err, result) => {
	        if (err) {
	            throw err;
	        }

	        // necessary query so dropdown box will have available games
	        db.query('SELECT game_id,game_name FROM Games ORDER BY game_name ASC', (err, games) => {
	            if (err) {
	                throw err;
	            }
	            console.log(`Attempting to edit game session ${id}`);
	            res.render('edit-game-session.ejs', {
	                title: 'Board Games | Edit Game Session',
	                gameSession: result[0],
	                games: games
	            });
	        });
	    });
	},
	// renders delete-game-session.ejs when `Delete` button is clicked on Game Session col of index.ejs
	getDelete: (req, res) => {
		let id = req.params.id;

		// query to show user what game session they are about to delete based on row of Delete button being pressed
		let query = 'SELECT Games.game_name,GameSessions.game_session_id,GameSessions.game_session_start_date FROM GameSessions JOIN Games ON GameSessions.game_id = Games.game_id WHERE game_session_id = ?';
		db.query(query, [id], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Attempting to delete game session ${id}`);
			res.render('delete-game-session.ejs', {
				title: 'Board Games | Delete Game Session',
				gameSession: result[0]
			});
		});
	},
	// runs when `Add Game Session` button is pushed on add-game-session.ejs
	postAdd: (req, res) => {
		let { game_id, startDate } = req.body;
		// basic insertion query
		let query = 'INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (?, ?)';

		db.query(query, [game_id, startDate], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Game session added for game id ${game_id}`);
			res.redirect('/');
		});
	},
	// runs when `Edit Game Session` button is pushed on edit-game-session.ejs
	postEdit: (req, res) => {
	    let id = req.params.id;

	    // query to update game session based on row that Edit button was pressed
	    let { startDate, gameSelect } = req.body;
	    let query = 'UPDATE GameSessions SET game_session_start_date = ?, game_id = ? WHERE game_session_id = ?';
	    db.query(query, [startDate, gameSelect, id], (err, result) => {
	        if (err) {
	            throw err;
	        }
	        console.log(`Game Session ${id} updated to time ${startDate} and game id ${gameSelect}`);
	        res.redirect('/');
	    });
	},
	// runs when `Yes` button is pushed on delete-game-session.ejs
	postDelete: (req, res) => {
		let id = req.params.id;

		// query to delete game if Yes is pressed
		if(req.body.delete === 'Yes'){
			let query = 'DELETE FROM GameSessions WHERE game_session_id = ?';
			db.query(query, [id], (err, result) => {
				if (err) {
					throw err;
				}
				console.log(`Game Session ${id} deleted`);
				res.redirect('/');
			});
		}
		else{
			res.redirect('/');
		}
	}
};
