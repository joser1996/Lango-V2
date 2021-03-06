const express =  require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const APIRequest = require("request");

dotenv.config();

const UserModel = require('./User');
const CardModel = require('./FlashCard');
const FlashCard = require('./FlashCard');

const app = express();
app.listen(4000, () => {
    console.log("Server Started");
});

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGO_USER}:${process.env.MONGO_PASS}${process.env.END_MONGODB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to mongoose succesfully")
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true}));

app.use(cookieSession({
    maxAge: 6*60*60*1000,
    keys: ['hanger waldo mercy dance'],
    // sameSite: false,
    // secure: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    console.log("Serialize: ", user);
    return done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, doc) => {
        return done(null, doc)
    });
});

//Step 2
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost/auth/google/callback"
  },

  //Called on successful authentication
  //step 3
  function(accessToken, refreshToken, profile, cb) {
    UserModel.findOne({ googleId: profile.id }, async (err, doc) => {
        if (err) {
            console.error(err);
            return cb(err, null)
        }
        if (!doc) {
            //user doesn't exist
            console.log("Creating a new document");
            const document = new UserModel({
                googleId: profile.id,
                userName: profile.name.givenName
            });

            await document.save();
            cb(null, document);
        } else {
            console.log("Existing doc", doc);
            cb(null, doc);
        }
    });
  } 
));

//Step 1
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
//Step 4
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('http://localhost:3000');
});
app.get('/', (req, res) => {res.send("Hello World")});

app.get('/get/user', (req, res) => {
    //console.log("USER: ", req.user);
    res.send(req.user);
});

app.get('/translate/word', (req, res, next) => {
    //console.log("Got Request")
    let queryObj = req.query;
    let url = process.env.API_URL + process.env.API_KEY;

    if (queryObj.english != undefined ) {
        let sourceWord = queryObj.english;
        let requestObj = {
            "source": "en",
            "target": "ja",
            "q": [sourceWord] 
        }

        APIRequest({
            url: url,
            method: "POST",
            headers: {"content-type": "application/json"},
            json: requestObj
        }, APICallback
        );

        function APICallback(err, APIResHead, APIResBody) {
            if (err || (APIResHead.statusCode!= 200)) {
                console.log("Got an API Error");
                console.log(APIResBody);
            } else {
                //console.log("Body: ", APIResBody)
                let response = {
                    "english": sourceWord,
                    "japanese": APIResBody.data.translations[0].translatedText
                };
                res.json(response);
            }
        }
    } else {
        next();
    }

});

app.get('/store/words', (req, res) => {
    let url = req.url;
    let queryObj = req.query;
    console.log('req id: ', req.user);
    const document = new FlashCard({
        user_id: req.user._id,
        word_one: queryObj.english,
        word_two: queryObj.japanese,
        seen: true,
        correct: true
    });

    resObj = {status: true};
    document.save();
    res.send(resObj);
});

app.get('/get/cards', (req, res) => {
    const userId = req.user._id
    console.log("ID: ", userId);
    if (userId === null) {
        res.send({success: false})
    } else {
        console.log("Sending cards")
        FlashCard.find({user_id: userId}, (err, doc) => {
            console.log("Doc from DB: ", doc)
            res.send(doc)
        });
    }
});