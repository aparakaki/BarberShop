module.exports = function (sequelize, DataTypes) {
    var Detail = sequelize.define("Detail", {
        // serviceId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    },
        {
            timestamps: false
        });

    return Detail;
} 
