module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Enrollments', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        course_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Courses',
            key: 'id'
          }
        },
        enrolled_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Enrollments');
    }
  };