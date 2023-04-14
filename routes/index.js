module.exports = {
	getHomePage: (req, res) => {
		let gamesQuery = `
		SELECT 
			Games.game_id, 
			Games.game_name, 
			MAX(GameSessions.game_session_start_date) AS last_played 
		FROM Games 
		LEFT JOIN 
			GameSessions ON Games.game_id = GameSessions.game_id 
		GROUP BY 
			Games.game_id, 
			Games.game_name`;

		db.query(gamesQuery, (err, gamesResult) => {
			if (err) {
				console.log(err);
				res.redirect('/');
			}

		let gameSessionsQuery = "SELECT * FROM GameSessions";

		db.query(gameSessionsQuery, (err, gameSessionsResult) => {
			if (err) {
				console.log(err);
				res.redirect('/');
			}

			res.render('index.ejs', {
				title: 'Board Games',
				games: gamesResult,
				gameSessions: gameSessionsResult
			});
		});
	});
	}
};
