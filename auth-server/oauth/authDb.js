const Sequelize = require('sequelize');


export const sequelize =
    new Sequelize(
        process.env.AUTH_DB_NAME,
        process.env.AUTH_DB_USERNAME,
        process.env.AUTH_DB_PASSWORD,
        {
            dialect: process.env.AUTH_DB_DIALECT,
            host: process.env.AUTH_DB_HOST,
            port: process.env.AUTH_DB_PORT,
            logging: process.env.AUTH_DB_LOGGING,
        })

const
    authorizationCode = sequelize.define('authorizationCode', {
        // attributes
        authorizationCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        redirectUri: {
            type: Sequelize.STRING,
            allowNull: false
        },
        client: {
            // type: Sequelize
        },
        user: {
            // type: Sequelize.STRING
        }
    }),
    client = sequelize.define('client', {
        // attributes
        authorizationCode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresAt: {
            type: Sequelize.STRING,
            allowNull: false
        },
        redirectUri: {
            type: Sequelize.STRING,
            allowNull: false
        },
        client: {
            type: Sequelize.STRING
        },
        user: {
            type: Sequelize.STRING
        }
    }),


export const authDb = {
    authorizationCode: authorizationCode,
    client: client,

};