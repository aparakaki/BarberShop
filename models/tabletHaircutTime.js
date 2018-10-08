module.exports = function (sequelize, DataTypes) {
    var tabletTrackerTime = sequelize.define("tabletTrackerTime", {
        userName: {
            type: DataTypes.STRING
        },
        startTime: {
            type: DataTypes.INTEGER,
        },
        endTime: {
            type: DataTypes.INTEGER,
        },
        totalTime: {
            type: DataTypes.INTEGER,
        }
    },
        {
        timestamps: false
        });
    return tabletTrackerTime;
}