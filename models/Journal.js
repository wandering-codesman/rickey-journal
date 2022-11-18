const { Sequelize, DataTypes, db } = require('../db');

const Journal = db.define('journal', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.INTEGER
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Journal };
