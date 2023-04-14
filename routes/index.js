module.exports = {
	getHomePage: (req, res) => {
		// TODO: Make query for games list
		let gamesQuery = "SELECT * FROM Games";

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
					//title: 'Board Games | View Games',
					games: gamesResult,
					gameSessions: gameSessionsResult
				});
			});
		});
	}
};
