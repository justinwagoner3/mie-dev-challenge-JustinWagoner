# Table Creation
CREATE TABLE Games (
    game_id INT NOT NULL AUTO_INCREMENT,
    game_name VARCHAR(255) NOT NULL,
    game_image LONGBLOB,
    PRIMARY KEY (game_id)
);

CREATE TABLE GameSessions (
    game_session_id INT NOT NULL AUTO_INCREMENT,
    game_id INT NOT NULL,
    game_session_start_date DATETIME NOT NULL,
    PRIMARY KEY (game_session_id),
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);


# Insert sample games
INSERT INTO Games (game_name, game_image) VALUES ('Monopoly', 'https://toppng.com/uploads/preview/monopoly-collect-win-transparent-background-monopoly-guy-11563049600zctdjngr0t.png');
INSERT INTO Games (game_name, game_image) VALUES ('Othello', 'https://png.pngtree.com/png-vector/20210912/ourlarge/pngtree-go-othello-gomoku-png-image_3913163.jpg');
INSERT INTO Games (game_name, game_image) VALUES ('Catan', 'https://p7.hiclipart.com/preview/692/115/598/catan-boardgamegeek-dice-board-game-dice-thumbnail.jpg');
INSERT INTO Games (game_name, game_image) VALUES ('Cards Against Humanity', 'https://www.vhv.rs/dpng/d/465-4655968_cards-against-humanity-png-cards-against-humanity-packaging.png');
INSERT INTO Games (game_name, game_image) VALUES ('Ticket to Ride', 'https://banner2.cleanpng.com/20180629/hsk/kisspng-days-of-wonder-ticket-to-ride-series-board-game-pa-product-box-5b36f24fd48354.8126638415303276318705.jpg');

# Insert same game sessions
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-01 08:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 09:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 10:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-01 11:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-01 12:00:00');

INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-08 08:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-08 09:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (3, '2023-04-08 10:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-08 11:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-08 12:00:00');
