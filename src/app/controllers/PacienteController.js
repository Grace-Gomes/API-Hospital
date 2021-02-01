import { QueryTypes } from 'sequelize';
import db from '../../database';
import Paciente from '../models/Paciente';

class PacienteController {
    async store(req, res) {
        const pacienteExists = await Paciente.findOne({
            where: { email: req.body.email },
        });

        if (pacienteExists) {
            return res.status(400).json({ error: 'Paciente already exists.' });
        }
        const { id, name, email, telefone, id_medico } = await Paciente.create(
            req.body
        );

        return res.json({
            id,
            name,
            email,
            telefone,
            id_medico,
        });
    }

    async update(req, res) {
        const { id, odlPassword } = req.body;

        const paciente = await Paciente.findByPk(req.pacienteId);

        if (id !== Paciente.index) {
            const pacienteExists = await Paciente.findOne({
                where: { id },
            });

            if (pacienteExists) {
                return res
                    .status(400)
                    .json({ error: 'Paciente already exists.' });
            }
        }

        if (odlPassword && !(await paciente.checkPassword(odlPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { name, email, telefone, id_medico } = await paciente.update(
            req.body
        );

        return res.json({
            id,
            name,
            email,
            telefone,
            id_medico,
        });
    }

    async index(req, res) {
        const paciente = await Paciente.findAll();
        return res.json(paciente);
    }

    async show(req, res) {
        const { id } = req.params;
        const paciente = await Paciente.findAll({
            where: { id },
        });
        return res.json(paciente);
    }

    async delete(req, res) {
        const { id } = req.body;

        const pacienteExists = await Paciente.findByPk(id);

        if (!pacienteExists)
            res.status(400).json({ error: 'Paciente not exists' });

        await pacienteExists.destroy({ where: { id } });

        return res
            .status(200)
            .json({ msg: 'Paciente was successfully deleted' });
    }

    async join(req, res) {
        const { id } = req.body;
        const sql = `
        select * from pacientes
        as P inner join medicos as M on P.id_medico = M.id
        where P.id=$id ;`;

        const medicos = await db.connection.query(sql, {
            type: QueryTypes.SELECT,
            bind: {
                id,
            },
        });

        return res.json(medicos);
    }
}

export default new PacienteController();
