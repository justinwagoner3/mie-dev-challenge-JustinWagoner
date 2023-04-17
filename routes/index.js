module.exports = {
	getHomePage: (req, res) => {
		// query for displaying list of games available
		let gamesQuery = `
			SELECT 
				Games.game_id, 
				Games.game_name, 
				Games.game_image,
				MAX(GameSessions.game_session_start_date) AS last_played, 
				COUNT(GameSessions.game_session_id) AS times_played
			FROM Games 
			LEFT JOIN 
				GameSessions ON Games.game_id = GameSessions.game_id 
			GROUP BY 
				Games.game_id
			ORDER BY
				times_played DESC,
				Games.game_name ASC`;

		db.query(gamesQuery, (err, gamesResult) => {
			if (err) {
				console.log(err);
				res.redirect('/');
			}

		// query for displaying list of game sessions that have happened
		let gameSessionsQuery = `
			SELECT 
				GameSessions.game_session_start_date,
				GameSessions.game_session_id,
				Games.game_name 
			FROM GameSessions
			JOIN
				Games ON GameSessions.game_id = Games.game_id
			ORDER BY 
				GameSessions.game_session_start_date DESC`;

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
