module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	getEdit: (req, res) => {
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game'
		});
	},
	postAdd: (req, res) => {
		// TODO db.query to insert game
		let { name } = req.body;
		let query = `INSERT INTO Games (game_name) VALUES ('${name}')`;
		db.query(query, (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`${name} added to database`);
			// If all went well, go back to main screen
			res.redirect('/');
		});


	},
	postEdit: (req, res) => {
		let id = req.params.id;

		// TODO db.query to update game

		res.redirect('/');
	}
};
