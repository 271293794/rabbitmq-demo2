
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('order', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        writeTime: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false
        }
    }, {
        tableName: 'order',
        timestamps: false
    });
};

