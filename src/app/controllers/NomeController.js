import Medico from '../models/Medico';

class NomeController {
    async index(req, res) {
        const { name } = req.body;

        const medicoExists = await Medico.findByPk({
            where: { id: req.body.id },
        });

        if (!medicoExists) res.status(400).json({ error: 'Medico not exists' });

        await medicoExists.get({ where: { name } });

        return res.status(200).json({ msg: 'Medico listado ' });
    }
}

export default new NomeController();
