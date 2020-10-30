const Sequelize = require('sequelize');
const db = require('../database');

const { createStore } = require('./schema');

class PealimService {
    constructor() {
        this.store = createStore();
    }
    async test() {
        // TODO: pagination, filters (hebrew, group, shoresh, translate)

        const verbs = await this.store.Poal.findAll({ limit: 10 });

        const verbsWithTranslations = [];
        for(let idx in verbs) {
            const verb = verbs[idx].dataValues;
            verb.translations = await this.getTranslations(verb);
            verbsWithTranslations.push(verb);
        }

        return { verbs: verbsWithTranslations };
    }

    async getTranslations(verb) {
        const sequelize = db.instance();

        let translations = {};

        const data = await sequelize.query(`SELECT * FROM translations WHERE "poalId" = '${verb.id}'`, {
            type: Sequelize.QueryTypes.SELECT,
        });

        for(let idx in data) {
            const { code, text } = data[idx];

            translations[code.trim()] = text;
        }

        return translations;
    }
}

const singletonInstance = new PealimService();
module.exports = singletonInstance;