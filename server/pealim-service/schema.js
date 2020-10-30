const Sequelize = require('sequelize');
const db = require('../database');

// TODO: trocar por esquema do collect

module.exports.createStore = () => {

    this.sequelize = db.instance();

    const Poal = this.sequelize.define('poal', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        shem_poal: {
            type: Sequelize.STRING,
        },
        root: {
            type: Sequelize.STRING,
        },
        shem_poal_n: {
            type: Sequelize.STRING,
        },
        pr_1: {
            type: Sequelize.STRING,
        },
        pr_1_n: {
            type: Sequelize.STRING,
        },
        pr_2: {
            type: Sequelize.STRING,
        },
        pr_2_n: {
            type: Sequelize.STRING,
        },
        pr_3: {
            type: Sequelize.STRING,
        },
        pr_3_n: {
            type: Sequelize.STRING,
        },
        pr_4: {
            type: Sequelize.STRING,
        },
        pr_4_n: {
            type: Sequelize.STRING,
        },
        prep: {
            type: Sequelize.STRING,
        },
    }, {
        tableName: 'pealim',
    });

    return {
        Poal,
    };
};