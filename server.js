require('dotenv').config('.env');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const { userRt, journalRt, checkRegisteredUser } = require('./routes');
const { auth, requiresAuth } = require('express-openid-connect');
const { Journal } = require('./models/Journal');
const { User } = require('./models/User');
const { resolveConfigFile } = require('prettier');
const {
    PORT = 3000,
    AUTH0_SECRET,
    AUTH0_AUDIENCE,
    AUTH0_CLIENT_ID,
    AUTH0_BASE_URL,
    JWT_SECRET
} = process.env;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    baseURL: AUTH0_AUDIENCE,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_BASE_URL
};

// middleware
// app.use('/users', userRt);
app.use(cors());
app.use(morgan('dev'));
app.use(auth(config));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    if (!requiresAuth()) {
        res.sendFile(__dirname + '/html/home-user.html');
    }
    // res.sendFile(__dirname + '/html/home.html');
    res.send('hello');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.sendFile(__dirname + '/html/profile.html');
});

app.get('/profile/journal', requiresAuth(), async (req, res) => {
    const journal = await Journal.findAll();
    res.sendFile(__dirname + '/html/journal.html');
    res.json(journal);
});

app.post('/profile/journal', requiresAuth(), async (req, res) => {
    try {
        const journal = await Journal.create({
            title: req.body.title,
            date: req.body.date,
            content: req.body.content
        }).then((result) => res.redirect(result));
    } catch (error) {
        console.log(error);
    }
});

// app.post('/profile/journal', requiresAuth(), async (req, res) => {
//     const [journal, newJournal] = await Journal.findOrCreate({
//         where: {
//             title:
//             date:
//             content:
//         }
//     });
//     res.sendFile(__dirname + '/html/journal.html');
//     res.json(journal);
// });

// server
app.listen(PORT, () => {
    console.log(`View Journal at http://localhost:${PORT}`);
});

module.exports = {
    config
};
