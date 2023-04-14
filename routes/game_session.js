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
	postAdd: (req, res) => {
		let { game, startDate } = req.body;
		let query = `INSERT INTO GameSessions (game_id, game_session_start_date) VALUES ('${game}', '${startDate}')`;

		db.query(query, (err, result) => {
			if (err) throw err;
			console.log(`Game session added for ${game}`);
			res.redirect('/');
		});
	}
};
