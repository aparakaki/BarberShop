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

        Service.associate = function (models) {
            Service.belongsToMany(models.Appointment, {
                through: models.Detail,
                onDelete: 'cascade'                 
            });
        }


    return Service;
} 