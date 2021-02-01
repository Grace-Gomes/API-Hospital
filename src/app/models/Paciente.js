import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Paciente extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                telefone: Sequelize.INTEGER,
                id_medico: Sequelize.INTEGER.UNSIGNED,
            },
            {
                tableName: 'pacientes',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                sequelize,
            }
        );

        this.addHook('beforeSave', async (paciente) => {
            if (paciente.password) {
                paciente.password_hash = await bcrypt.hash(
                    paciente.password,
                    8
                );
            }
        });
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default Paciente;
