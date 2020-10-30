const Sequelize = require('sequelize');

class Database {
    constructor() {
        const dbString = process.env.DATABASE_URL || 'postgres://ricardo:liquid20@localhost:5432/pealim';

        console.log('Sequelize instantiated!');

        this.sequelize = new Sequelize(dbString, {
            logging: process.env.LOG_SEQUELIZE === '1' ? console.log : false,
        });
    }

    instance() {
        return this.sequelize;
    }
}

const singletonInstance = new Database();
module.exports = singletonInstance;