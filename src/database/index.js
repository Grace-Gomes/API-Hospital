import Sequelize from 'sequelize';
import Paciente from '../app/models/Paciente';
import Medico from '../app/models/Medico';

import databaseConfig from '../config/database';

const models = [Paciente, Medico];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.map((model) => model.init(this.connection));
    }
}

export default new Database();
