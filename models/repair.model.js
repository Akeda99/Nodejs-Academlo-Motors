const { DataTypes } = require("sequelize");
const { db } = require("../database/db");

const Repair=db.define('repair',{
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    date:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', 
        enum: ['pending','completed','cancelled']
    },

})
module.exports= Repair;