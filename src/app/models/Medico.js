import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Medico extends Model {
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
                crm: Sequelize.INTEGER,
            },
            {
                tableName: 'medicos',
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                sequelize,
            }
        );

        this.addHook('beforeSave', async (medico) => {
            if (medico.password) {
                medico.password_hash = await bcrypt.hash(medico.password, 8);
            }
        });
        return this;
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default Medico;
