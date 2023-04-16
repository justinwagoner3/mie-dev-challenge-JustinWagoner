DockerInstructions.txt

 1. Delete/remove any currently running Docker processes
  * `docker kill miedb`
  * `docker rm miedb`
  * `docker kill board-game-directory`
  * `docker rm board-game-directory`
 2. Start the database as a Docker container
  * `docker run --name=miedb -d -p 3307:3306 -e MARIADB_USER=app -e MARIADB_PASSWORD=wonderful -e MARIADB_DATABASE=miechallenge -e MARIADB_ROOT_PASSWORD=wonderful mariadb:latest`
 3. Create tables and insert data into the tables (must be copy and pasted one command at a time):
  *
```
docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "CREATE TABLE Games (
    game_id INT NOT NULL AUTO_INCREMENT,
    game_name VARCHAR(255) NOT NULL,
    game_image LONGBLOB,
    PRIMARY KEY (game_id)
);"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "CREATE TABLE GameSessions (
    game_session_id INT NOT NULL AUTO_INCREMENT,
    game_id INT NOT NULL,
    game_session_start_date DATETIME NOT NULL,
    PRIMARY KEY (game_session_id),
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO Games (game_name, game_image) VALUES ('Monopoly', 'https://toppng.com/uploads/preview/monopoly-collect-win-transparent-background-monopoly-guy-11563049600zctdjngr0t.png');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO Games (game_name, game_image) VALUES ('Othello', 'https://png.pngtree.com/png-vector/20210912/ourlarge/pngtree-go-othello-gomoku-png-image_3913163.jpg');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO Games (game_name, game_image) VALUES ('Catan', 'https://p7.hiclipart.com/preview/692/115/598/catan-boardgamegeek-dice-board-game-dice-thumbnail.jpg');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO Games (game_name, game_image) VALUES ('Cards Against Humanity', 'https://www.vhv.rs/dpng/d/465-4655968_cards-against-humanity-png-cards-against-humanity-packaging.png');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO Games (game_name, game_image) VALUES ('Ticket to Ride', 'https://banner2.cleanpng.com/20180629/hsk/kisspng-days-of-wonder-ticket-to-ride-series-board-game-pa-product-box-5b36f24fd48354.8126638415303276318705.jpg');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-01 08:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 09:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-01 10:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-01 11:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-01 12:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (1, '2023-04-08 08:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (2, '2023-04-08 09:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (3, '2023-04-08 10:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (4, '2023-04-08 11:00:00');"

docker exec -it miedb mysql --user=app --password=wonderful miechallenge -e "INSERT INTO GameSessions (game_id, game_session_start_date) VALUES (5, '2023-04-08 12:00:00');"

```
 4. Build the app
  * `docker build -t board-game-directory .`
 5. Run the app
  * `docker run -d -p 3000:3000 --name board-game-directory --link miedb:mysql board-game-directory`
 6. Go to `http://localhost:3000/`

