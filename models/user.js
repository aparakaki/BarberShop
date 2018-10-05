module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        token: {
            type: DataTypes.STRING
        }
    },
        {
            timestamps: false
        });
    // User.associate = function (models) {
    //     User.belongsToMany(models.Service, {
    //         through: models.Appointment,
    //         foreignKey: {
    //             name: "serviceId",
    //             unique: false
    //         }
    //     });
    // }

    return User;
}