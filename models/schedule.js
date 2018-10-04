module.exports = function (sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        morningTime1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime2: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime3: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime4: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime5: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime6: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime7: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        morningTime8: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime1: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime2: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime3: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime4: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime5: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime6: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime7: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        afternoonTime8: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
        {
            timestamps: false
        })

    return Schedule;
}