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
    FOREIGN KEY (game_id) REFERENCES Games(game_id)
);


# Insert sample games
INSERT INTO Games (game_name, game_image) VALUES ('Monopoly', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Othello', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Catan', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Cards Against Humanity', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Ticket to Ride', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Pandemic', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Game of Life', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('UNO', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Codenames', '<IMAGE>');
INSERT INTO Games (game_name, game_image) VALUES ('Sorry', '<IMAGE>');

# Insert same game sessions
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-01 08:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 09:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (3, '2023-04-01 10:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-01 11:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-01 12:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (6, '2023-04-01 13:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (7, '2023-04-01 14:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (8, '2023-04-01 15:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (9, '2023-04-01 16:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (10, '2023-04-01 17:00:00');

INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-08 08:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-08 09:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (3, '2023-04-08 10:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-08 11:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-08 12:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (6, '2023-04-08 13:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (7, '2023-04-08 14:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (8, '2023-04-08 15:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (9, '2023-04-08 16:00:00');
INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (10, '2023-04-08 17:00:00');
