/**
 * Created by klaas on 20.10.16.
 */
module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define("Device", {
        uuid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
}