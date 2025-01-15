const { Model, DataTypes } = require('sequelize');
const config = require('../config/database.js');
const { Sequelize } = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

class Enrollment extends Model {}

Enrollment.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  },
  enrolled_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Enrollment',
  timestamps: false
});

module.exports = Enrollment;
