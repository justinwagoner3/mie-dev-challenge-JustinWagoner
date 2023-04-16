module.exports = {
	getAdd: (req, res) => {
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
	getEdit: (req, res) => {
	    let id = req.params.id;

	    // db.query to get game_session by id
	    let query = 'SELECT GameSessions.game_session_id, GameSessions.game_id, GameSessions.game_session_start_date, Games.game_name FROM GameSessions JOIN Games ON GameSessions.game_id = Games.game_id WHERE game_session_id = ?';

	    db.query(query, [id], (err, result) => {
	        if (err) {
	            throw err;
	        }

	        console.log(`Attempting to edit game session ${id}`);

	        // necessary to do another query so dropdown box will have available games
	        db.query('SELECT game_id,game_name FROM Games ORDER BY game_name ASC', (err, games) => {
	            if (err) {
	                throw err;
	            }

	            // Pass both the game session and games to the view
	            res.render('edit-game-session.ejs', {
	                title: 'Board Games | Edit Game Session',
	                gameSession: result[0],
	                games: games
	            });
	        });
	    });
	},
	getDelete: (req, res) => {
		let id = req.params.id;

		// db.query to get game_session by id
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
	postAdd: (req, res) => {
		let { game_id, startDate } = req.body;
		let query = 'INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (?, ?)';

		db.query(query, [game_id, startDate], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Game session added for game id ${game_id}`);
			res.redirect('/');
		});
	},
	postEdit: (req, res) => {
	    let id = req.params.id;

	    // db.query to update game session with new game id and start date
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
	postDelete: (req, res) => {
		let id = req.params.id;

		// db.query to delete game if Yes is pressed
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
