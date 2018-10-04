module.exports = function (sequelize, DataTypes) {
    var Service = sequelize.define("Service", {
        style: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: {
            type: DataTypes.TINYINT
        },
        price: {
            type: DataTypes.DECIMAL
        },
        description: {
            type: DataTypes.TEXT
        }
    },
        {
            timestamps: false
        });
    // Service.associate = function (models) {
    //     Service.belongsToMany(models.User, {
    //         through: models.Appointment,
    //         foreignKey: {
    //             name: "userId",
    //             unique: false
    //         }
    //     });
    // }

    return Service;
} 