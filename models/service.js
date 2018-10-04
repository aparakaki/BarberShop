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
    Post.associate = function (models) {
        Post.belongsToMany(models.User, {
            through: "customerProfile"
        });
    }

    return Service;
} 