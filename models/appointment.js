module.exports = function (sequelize, DataTypes) {
    var Appointment = sequelize.define("Appointment", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        start: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        end: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        serviceStart:{
            type: DataTypes.INTEGER
        },
        serviceEnd: {
            type: DataTypes.INTEGER
        },
        serviceLength: {
            type: DataTypes.INTEGER            
        },
        completed: {
            type: DataTypes.BOOLEAN
        }
    },
        {
            timestamps: false
        });

        Appointment.associate = function (models) {
            Appointment.belongsToMany(models.Service, {
                through: models.Detail,
                onDelete: 'cascade' 
            });
        }

    return Appointment;
} 
