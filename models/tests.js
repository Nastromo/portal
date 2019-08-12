module.exports = (db, type) => {
    return db.define('tests', {
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
        title: {
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
        date: {
            type: type.BIGINT,
            allowNull: false,
            defaultValue: () => Date.now()
        },
    })
}