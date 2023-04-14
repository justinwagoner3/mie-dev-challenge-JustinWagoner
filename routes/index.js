module.exports = {
	getHomePage: (req, res) => {
		// TODO: Make query for games list
		let query = "SELECT * FROM Games";

		db.query(query, (err, result) => {
			if (err) {
				console.log(err);
				res.redirect('/');
			}
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				games: result
			});
		});
	}
};
