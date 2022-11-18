const { db } = require('../db');
const { User } = require('./User');
const { Journal } = require('./Journal');
const { userData, journalData } = require('./seedData');

const seed = async () => {
    try {
        await db.sync({ force: true }); // recreates the db
        const createdUsers = await User.bulkCreate(userData);
        const createdJournals = await Journal.bulkCreate(journalData);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { seed };
