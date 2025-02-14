const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const config = require('../config/database.js')
const Course = require('./course.js'); 
const Enrollment = require('./enrollment.js'); 

const environment = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[environment]);

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.hasMany(Enrollment, { foreignKey: 'user_id', as: 'Enrollments' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'EnrolledCourse' });

module.exports = User;
