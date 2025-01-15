const { Model, DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
const config = require('../config/database.js');

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

class Course extends Model {}

Course.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    timestamps: false,
  }
);

module.exports = Course;
