const db = require('./db')
const Sequelize = require('sequelize');

const Auth = db.define('auth', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Auth;
