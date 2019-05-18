module.exports = (db, type) => {
    return db.define('payments', {
        userId: {
            type: type.STRING,
            primaryKey: true,
        },
        testTitle: {
            type: type.STRING,
            allowNull: false,
        },
        status: {
            type: type.STRING,
            allowNull: false,
        },
        amount: {
            type: type.INTEGER,
            allowNull: false,
        },
        date: {
            type: type.BIGINT,
            allowNull: false,
        },
    })
}