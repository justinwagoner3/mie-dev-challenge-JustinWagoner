module.exports = {
	getAdd: (req, res) => {
		db.query('SELECT * FROM Games ORDER BY game_name ASC', (err, results) => {
			if (err) throw err;
			res.render('add-game-session.ejs', {
				title: 'Board Games | Add game session',
				games: results
			});
		});
	},
	getEdit: (req, res) => {
		let id = req.params.id;

		// db.query to get game_session by id
		let query = `
			SELECT GameSessions.game_session_id, GameSessions.game_id, GameSessions.game_session_start_date, Games.game_name 
			FROM GameSessions 
			JOIN Games ON GameSessions.game_id = Games.game_id
			WHERE game_session_id = ${id}`;
		db.query(query, (err, result) => {
			if (err) {
				throw err;
			}

			res.render('edit-game-session.ejs', {
				title: 'Board Games | Edit game session',
				gameSession: result[0]
			});
		});
	},
	getDelete: (req, res) => {
		let id = req.params.id;

		// db.query to get game_session by id
		let query = `
			SELECT Games.game_name,GameSessions.game_session_id,GameSessions.game_session_start_date
			FROM GameSessions 
			JOIN Games ON GameSessions.game_id = Games.game_id
			WHERE game_session_id = ${id}`;
		db.query(query, (err, result) => {
			if (err) {
				throw err;
			}

			res.render('delete-game-session.ejs', {
				title: 'Board Games | Delete game session',
				gameSession: result[0]
			});
		});
	},
	postAdd: (req, res) => {
		let { game, startDate } = req.body;
		let query = `INSERT INTO GameSessions (game_id, game_session_start_date) VALUES ('${game}', '${startDate}')`;

		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(`Game session added for ${game}`);
			res.redirect('/');
		});
	},
	postEdit: (req, res) => {
		let id = req.params.id;

		// db.query to update game
		let { startDate } = req.body;
		let query = `UPDATE GameSessions SET game_session_start_date = '${startDate}' WHERE game_session_id = ${id}`;
		db.query(query, (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Game Session ${id} updated to time ${startDate}`);
			res.redirect('/');
		});
	},
	postDelete: (req, res) => {
		let id = req.params.id;

		// db.query to delete game if Yes is pressed
		if(req.body.delete === 'Yes'){
			let query = `DELETE FROM GameSessions WHERE game_session_id = ${id}`;
			db.query(query, (err, result) => {
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
