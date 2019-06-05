module.exports = (db, type) => {
    return db.define('payments', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true,
        },
        userId: {
            type: type.STRING,
            primaryKey: true,
        },
        accession: {
            type: type.STRING,
            allowNull: true,
        },
        report: {
            type: type.STRING,
            allowNull: true,
        },
        testTitle: {
            type: type.STRING,
            allowNull: false,
        },
        quantity: {
            type: type.INTEGER,
            allowNull: true,
        },
        status: {
            type: type.STRING,
            allowNull: true,
        },
        amount: {
            type: type.INTEGER,
            allowNull: true,
        },
        date: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        address: {
            type: type.STRING,
            allowNull: false,
        },
        city: {
            type: type.STRING,
            allowNull: false,
        },
        state: {
            type: type.STRING,
            allowNull: false,
        },
        zip: {
            type: type.STRING,
            allowNull: false,
        },
    })
}