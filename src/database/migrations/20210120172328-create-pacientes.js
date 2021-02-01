module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('pacientes', {
            id: {
                type: Sequelize.INTEGER,

                allowNull: false,

                autoIncrement: true,

                primaryKey: true,
            },

            name: {
                type: Sequelize.STRING,

                allowNull: false,

                unique: true,
            },

            password_hash: {
                type: Sequelize.STRING,

                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,

                allowNull: false,
            },

            telefone: {
                type: Sequelize.INTEGER,

                allowNull: false,
            },

            id_medico: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: { model: 'medicos', key: 'id' },
                allowNull: false,
            },

            created_at: {
                type: Sequelize.DATE,

                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,

                allowNull: false,
            },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('pacientes');
    },
};
