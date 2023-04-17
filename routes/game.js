module.exports = {
	// renders when `Add Game` button is pushed on Game col of index.ejs
	getAdd: (req, res) => {
		console.log(`Attempting to add a game`);
		res.render('add-game.ejs', {
			title: 'Board Games | Add Game'
		});
	},
	// renders when `Edit` button is pushed on Game col of index.ejs
	getEdit: (req, res) => {
		let id = req.params.id;

		// query to display to the user what hame they are about to edit
		let query = 'SELECT game_name,game_id,game_image FROM Games WHERE game_id = ?';
		db.query(query, [id], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Attemping to edit game "${result[0].game_name}" with id ${id}`)
			res.render('edit-game.ejs', {
				title: 'Board Games | Edit Game',
				game: result[0]
			});
		});
	},
	// renders when `Delete` button is pushed on Game col of index.ejs
	getDelete: (req, res) => {
		let id = req.params.id;

		// query to display to user what game they are about to delete
		let query = 'SELECT game_name,game_id FROM Games WHERE game_id = ?';
		db.query(query, [id], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Attemping to delete game "${result[0].game_name}" with id ${id}`)
			res.render('delete-game.ejs', {
				title: 'Board Games | Delete Game',
				game: result[0]
			});
		});
	},
	// runs when `Add Game` button is pushed on add-game.ejs
	postAdd: (req, res) => {
		// query to insert game
		let { name, image_url } = req.body;
		let query = 'INSERT INTO Games (game_name, game_image) VALUES (?,?)';
		db.query(query, [name, image_url], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`"${name}" added to Games table`);
			// If all went well, go back to main screen
			res.redirect('/');
		});
	},
	// runs when `Edit Game` button is pushed on edit-game.ejs
	postEdit: (req, res) => {
		let id = req.params.id;

		// query to update game record selected name and image of whatever row they clicked Edit on
		let { name, image_url } = req.body;
		let query = 'UPDATE Games SET game_name = ?, game_image = ? WHERE game_id = ?';
		db.query(query, [name, image_url, id], (err, result) => {
			if (err) {
				throw err;
			}
			console.log(`Game ${id} updated to "${name}" with image URL "${image_url}"`);
			res.redirect('/');
		});
	},
	// runs when `Yes` button is pushed on delete-game.ejs
	postDelete: (req, res) => {
		let id = req.params.id;

		// query to delete game if Yes is clicked
		if(req.body.delete === 'Yes'){
			let query = 'DELETE FROM Games WHERE game_id = ?';
			db.query(query, [id], (err, result) => {
				if (err) {
					throw err;
				}
				console.log(`Game ${id} deleted`);
				res.redirect('/');
			});
		}
		else{
			console.log(`Game ${id} not deleted`);
			res.redirect('/');
		}	
	}
};
