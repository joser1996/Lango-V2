const express = require("express");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const APIRequest = require("request");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();
 
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});


//database stuff start
const dbSchema = `
CREATE TABLE IF NOT EXISTS Users(
    id INT PRIMARY KEY NOT NULL,
    first_name TEXT,
    last_name TEXT
);
CREATE TABLE IF NOT EXISTS FlashCards (
    user_id INT NOT NULL,
    word_one TEXT NOT NULL,
    word_two TEXT NOT NULL,
    seen INT,
    correct INT,
        FOREIGN KEY (user_id) REFERENCES Users(id)
);
`
console.log("Path", process.env.DB_PATH);
const dbPath = path.resolve(__dirname, process.env.DB_PATH);

const DB = new sqlite3.Database(dbPath, function(err) {
    if (err) {
        console.log("Failed to load DB: " + process.env.DB_PATH +" " + err);
        return;
    }
    console.log("Connected to " + process.env.DB_PATH + ' database.');
    DB.exec('PRAGMA foreign_keys=ON;', function(error) {
        if (error) {
            console.error("Failed to enable foreign keys.");
        }
    });

    DB.exec(dbSchema, function(err) {
        if (err) {
            console.log("Failed to run schema: " + err);
        }
    });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`)); 

/* Login Stuff */
const googleLoginData = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/redirect'
};

passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

app.use("/", printURL);

app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));

app.use(passport.initialize()); 

app.use(passport.session());

app.use( express.static('public'));

app.get('/auth/google', () => {
    console.log("Authorizing");
    passport.authenticate('google',{ scope: ['profile'] });
    console.log("Done")
});

app.get('/auth/redirect',
	// for educational purposes
	function (req, res, next) {
	    console.log("at auth/redirect");
	    next();
	},
	/* This will issue Server's own HTTPS request to Google
	 * to access the user's profile information with the 
	 * temporary key we got in the request. 
	 */
	passport.authenticate('google'),
	/* then it will run the "gotProfile" callback function,
	 * set up the cookie, call serialize, whose "done" 
	 * will come back here to send back the response
	 * ...with a cookie in it for the Browser! 
	 */
	function (req, res) {
	    console.log('Logged in and using cookies!')
	    res.redirect('/user/lango.html');
	}
);

function gotProfile(accessToken, refreshToken, profile, done) {
    console.log("Got Profile");
    //get info from google profile
    let first_name = profile.name.givenName;
    let last_name = profile.name.familyName;
    let userId = parseInt(profile.id, 10); 

    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

    let localUserCMD = "SELECT * FROM Users WHERE id = " + userId +";";
    DB.get(localUserCMD, userCallback);

    function userCallback(err, row) {
        let userInsert = 'INSERT into Users (id, first_name, last_name) VALUES (@0, @1, @2);';
        if(err) {
            console.log("Error in gotProfile");
            console.log("got: ", err, "\n");
        } else if (row != undefined) {
            console.log("User is already in DB!\n\n");
            console.log("row: ", row, "\n");
        } else {
            //user is not in the DB
            DB.run(userInsert, userId, first_name, last_name, insertCallback);
        }
    }
    let rowId = userId;
    done(null, rowId); 
}

function printURL (req, res, next) {
    console.log(req.url);
    next();
}