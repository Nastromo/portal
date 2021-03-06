const Sequelize = require('sequelize');
const UserModel = require('./models/users');
const PaymentModel = require('./models/payments');
const TestModel = require('./models/tests');



const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        supportBigNumbers: true,
    },
    operatorsAliases: false,
    define: {
        timestamps: false,
        freezeTableName: true,
    },
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
    query: { raw: true }
})



const User = UserModel(db, Sequelize);
const Payment = PaymentModel(db, Sequelize);
const Test = TestModel(db, Sequelize);


module.exports = {
    db,
    User,
    Payment,
    Test
}
