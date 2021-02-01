import Medico from '../models/Medico';

class MedicoController {
    async store(req, res) {
        const medicoExists = await Medico.findOne({
            where: { email: req.body.email },
        });

        if (medicoExists) {
            return res.status(400).json({ error: 'Medico already exists.' });
        }
        const { id, name, email, telefone, crm } = await Medico.create(
            req.body
        );

        return res.json({
            id,
            name,
            email,
            telefone,
            crm,
        });
    }

    async update(req, res) {
        const { id, odlPassword } = req.body;

        const medico = await Medico.findByPk(req.medicoId);

        if (id !== Medico.id) {
            const medicoExists = await Medico.findOne({
                where: { id },
            });

            if (medicoExists) {
                return res
                    .status(400)
                    .json({ error: 'Medico already exists.' });
            }
        }

        if (odlPassword && !(await medico.checkPassword(odlPassword))) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        const { name, email, telefone, crm } = await medico.update(req.body);

        return res.json({
            id,
            name,
            email,
            telefone,
            crm,
        });
    }

    async index(req, res) {
        const medico = await Medico.findAll({});
        return res.json(medico);
    }

    async show(req, res) {
        const { id } = req.params;
        const medico = await Medico.findAll({
            where: { id },
        });
        return res.json(medico);
    }

    async delete(req, res) {
        const { id } = req.body;

        const medicoExists = await Medico.findByPk(id);

        if (!medicoExists) res.status(400).json({ error: 'Medico not exists' });

        await medicoExists.destroy({ where: { id } });

        return res.status(200).json({ msg: 'Medico was successfully deleted' });
    }
}

export default new MedicoController();
