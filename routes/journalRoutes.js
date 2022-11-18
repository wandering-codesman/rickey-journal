const express = require('express');
const { Journal } = require('../models/Journal');
const router = express.Router();

// get users req
router.get('/', async (req, res) => {
    const journal = await Journal.findAll();
    res.send(journal);
});

module.exports = router;
