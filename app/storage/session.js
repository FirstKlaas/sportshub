module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
        start: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        end: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        classMethods: {
            associate: function(models) {
                Session.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Session;
};
