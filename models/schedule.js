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
        time: {
            type: DataTypes.TINYINT
        }
    },
        {
            timestamps: false
        });

    return Appointment;
} 
