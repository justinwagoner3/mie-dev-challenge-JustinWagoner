How To Run With Docker
=====

 1. Delete/remove any currently running Docker processes
  * `docker kill miedb`
  * `docker rm miedb`
  * `docker kill board-game-directory`
  * `docker rm board-game-directory`
 2. Start the database as a Docker container
  * `docker run --name=miedb -d -p 3307:3306 -e MARIADB_USER=app -e MARIADB_PASSWORD=wonderful -e MARIADB_DATABASE=miechallenge -e MARIADB_ROOT_PASSWORD=wonderful mariadb:latest`
 3. Change Directory into root dir of project
 4. Build and Run the app
  * `docker build -t board-game-directory . && docker run -d -p 3000:3000 --name board-game-directory --link miedb:mysql board-game-directory`
 5. Go to `http://localhost:3000/`

How To Use
=====
 1. The home page will display both of your tables `Games` and `Game Sessions`:
<img width="1388" alt="Screenshot 2023-04-17 at 9 46 19 AM" src="https://user-images.githubusercontent.com/34258177/232503340-3b18aaea-e43d-4670-a4a7-38c692ecef01.png">
 2. Inside of your <code>Games</code> table there is a button <code>Add Game</code> that you can press to load the screen to add a new game:
<img width="651" alt="image" src="https://user-images.githubusercontent.com/34258177/232503756-e9e2aa54-b296-4127-9cf9-a196ff8ff30e.png">
<img width="126" alt="image" src="https://user-images.githubusercontent.com/34258177/232503805-26e0db68-fea0-4c6a-aeff-6273bfd853c3.png">
 3. Now you can enter information for your game, then press <code>Add Game</code> to add the game to the library. NOTE the instructions on how to upload an image if you choose, though it can be left blank
 <img width="643" alt="image" src="https://user-images.githubusercontent.com/34258177/232504396-020944eb-9c85-45d9-9fd9-1a335938505f.png">
 4. After adding your game you will see a new record appear at the bottom of your <code>Games</code> table:
<img width="647" alt="image" src="https://user-images.githubusercontent.com/34258177/232504989-e7d5cf2a-80aa-40cd-91e0-43582cf46556.png">
 5. To Edit or Delete a game entry, you can click the <code>Edit</code> or <code>Delete</code> button on that game's row
 <img width="628" alt="image" src="https://user-images.githubusercontent.com/34258177/232505294-f77d8333-b950-4238-8d69-1a6969f44cd4.png">
 6. Clicking on <code>Edit</code> will give you the chance to update the game name and game image, and you can save changes by pressing <code>Edit Game</code>
 <img width="699" alt="image" src="https://user-images.githubusercontent.com/34258177/232505483-ef6a3313-967b-4bc2-9901-a38e5da5a630.png">
 7. Clicking on <code>Delete</code> will prompt the user with the game they want to delete, press <code>Yes</code> to delete or <code>No</code> to go back
 <img width="405" alt="image" src="https://user-images.githubusercontent.com/34258177/232505658-8bab50ce-192a-4240-ae2f-68217824c5cc.png">
 8. Inside of your <code>Game Sessions</code> table there is a button <code>Add Game Session</code> that you can press to load the screen to add a new game session:
 <img width="645" alt="image" src="https://user-images.githubusercontent.com/34258177/232505870-8cbf2dd1-910e-4fd1-b1e8-c351d87b5568.png">
 <img width="232" alt="image" src="https://user-images.githubusercontent.com/34258177/232506226-f63bbaf9-9fbf-423d-8049-62448f8ba988.png">
 9. Now you can enter the game and time played for your game session, then press <code>Add Game Session</code> to add the game session
 <img width="489" alt="image" src="https://user-images.githubusercontent.com/34258177/232506160-034f382e-4ef2-4295-bf95-6a0a0f85394b.png">
 10. You'll see your new game session at the top of the table, as they are sorted by time started:
<img width="640" alt="image" src="https://user-images.githubusercontent.com/34258177/232507559-72e337fb-08a8-483e-982b-beb5abe879f7.png">
 11. To Edit or Delete a game session entry, you can click the <code>Edit</code> or <code>Delete</code> button on that game session's row
<img width="617" alt="image" src="https://user-images.githubusercontent.com/34258177/232506430-0723cda0-2730-4eab-aab8-5fd981cc3678.png">
 12. Clicking on <code>Edit</code> will give you the change to update the game name and game start time, and you can save changes by pressing <code>Edit Game Session</code>
 <img width="878" alt="image" src="https://user-images.githubusercontent.com/34258177/232506610-9eaa188f-dd95-46a0-896a-c2aee36177f9.png">
 13. Clicking on <code>Delete</code> will prompt the user with the game they want to delete, press <code>Yes</code> to delete or <code>No</code> to go back
<img width="1032" alt="image" src="https://user-images.githubusercontent.com/34258177/232506768-0da88eb4-3137-40f7-8a5e-a3a895706c78.png">

Story: Board Game Directory
=====

A few months ago, your best friend organized a weekly board game night. As the number of participants
has grown, so has the library of available games. Your friend has asked you to create a website to
track which games are available, as well as all the times they have been played. Your goal is to
create a good-looking prototype that you won't be embarrassed to show your friend, not a fully-finished
product.

Requirements
=====

* Ability to add and edit a board game record
* Ability to add multiple game session records associated with a game
* Main screen should include a listing of available games, including the date of the most recent game session for each

Technical detail
=====

You should be able to develop on Windows, Mac, or Linux. The project has already been started for you. Out of the many, many alternatives, these are the tools we've chosen for this challenge:

* <a href="https://nodejs.org/en/">node.js</a>
* <a href="https://expressjs.com/">express - web server</a>
* <a href="https://ejs.co/">EJS - templating</a>
* <a href="https://mariadb.org/">MariaDB - database backend</a>

Also, consider using a [Dockerfile](https://docs.docker.com/engine/reference/builder/) to build your development environement.


Please note:

* We have not defined the database schema for you. You should decide which fields would be useful to collect and what the table structure should be and put the statements necessary for that in schema.sql.
* Include sample data in your schema.sql file so that we can see what your app looks like fully populated from the start.
* If you see any "TODO" comments in code, those are for you!

Features that are not required
=====

* User account management
* Reactivity

Bonus
=====

For extra points, think of a useful feature to add to the system that your friend didn't mention. Also, you can implement the database using a docker container (notes below)

Getting the code and completing your challenge
=====

Since this is a git template repository, it isn't possible to fork it, so you will need to "Use template" and clone it to your local development environment. Then, create a private github repository of your own and change that to be the upstream of your local copy. Once you are ready for us to see your code, add these users as collaborators to your project:

* https://github.com/tslabach
* https://github.com/lpeckham1
* https://github.com/dcornewell
* https://github.com/ariserac
* https://github.com/horner



Docker Notes if you'd like to implement a docker container for the database
============
To start the database as a docker service:
```
docker run --name=miedb -d -p 3307:3306 -e MARIADB_USER=app -e MARIADB_PASSWORD=wonderful -e MARIADB_DATABASE=miechallenge -e MARIADB_ROOT_PASSWORD=wonderful mariadb:latest
```
NOTE!!!, do not leave the docker running when done testing.  Do a `docker kill miedb` to kill it when done BUT the data in the database will BE GONE!  You can restart it by doing `docker restart miedb` but you should consider doing a `docker rm miedb` to cleanup.

You can connect to it from the host machine using:
`mysql --host=localhost -P 3307 --user=app --password=wonderful miechallenge`
or from docker by doing:
`docker exec -it miedb mysql --host=localhost -P 3306 --user=app --password=wonderful miechallenge`

Bonus points if you can make a fully automated Dockerfile container for building and testing the app with a GitHub Action.


How MIE will test your code
=====

* Reviewer will:

```

# if the developer does not know about or is incapable of dockerizing mysql and loading the data...
export APPLICANT_USER=''
git clone git@github.mieweb.com:$APPLICANT_USER/mie-dev-challenge devchallenge_$APPLICANT_USER
mysql -e "CREATE DATABASE devchallenge_$APPLICANT_USER"
mysql devchallenge_$APPLICANT_USER < schema.sql


# what we really should just have to to (if they do not do the bonus):
npm install
npm start
```

