module.exports = (db, type) => {
    return db.define('users', {
        userId: {
            type: type.STRING,
            primaryKey: true,
        },
        userRole: {
            type: type.STRING,
            allowNull: false,
        },
        regDate: {
            type: type.BIGINT,
            allowNull: false,
        },
        email: {
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