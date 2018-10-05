module.exports = function (sequelize, DataTypes) {
    var Detail = sequelize.define("Detail", {
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            timestamps: false
        });

        Detail.associate = function (models) {
            Detail.belongsTo(models.Appointment, {
        });
    }

    return Detail;
} 
