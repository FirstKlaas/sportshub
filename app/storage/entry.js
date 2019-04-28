module.exports = function(sequelize, DataTypes) {
    var Entry = sequelize.define("Entry", {
        speed: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        meter: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        seconds: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        device: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Entry;
};