module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isInt: true
            }
        },

    });

    return User;
};

