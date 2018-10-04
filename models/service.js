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
        }
    },
        {
            timestamps: false
        });
    Service.associate = function (models) {
        Service.belongsToMany(models.User, {
            through: "customerProfile"
        });
    }

    return Service;
} 