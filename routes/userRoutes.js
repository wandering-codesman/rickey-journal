require('dotenv').config('.env');
const express = require('express');
const router = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
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
const { User } = require('../models/User');

const checkRegisteredUser = async (req, res, next) => {
    if (req.oidc.user) {
        console.log(req.oidc.user);
        const [user, isCreated] = await User.findOrCreate({
            where: {
                username: req.oidc.user.nickname,
                name: req.oidc.user.name,
                email: req.oidc.user.email
            }
        });
    }
    ``;
    next();
};

// routes
router.get('/', requiresAuth(), async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.oidc.user.nickname
        },
        raw: true
    });
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1w' });

    res.send();
});

module.exports = router;
