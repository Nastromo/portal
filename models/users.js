module.exports = (db, type) => {
    return db.define('users', {
        userId: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userRole: {
            type: type.STRING,
            allowNull: false,
        },
        regDate: {
            type: type.BIGINT,
            allowNull: false,
        },
        login: {
            type: type.STRING,
            allowNull: true,
            unique: true,
        },
        pass: {
            type: type.STRING,
            allowNull: false,
        }
    })
}