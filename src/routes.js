import { Router } from 'express';

import PacienteController from './app/controllers/PacienteController';
import MedicoController from './app/controllers/MedicoController';
import NomeController from './app/controllers/NomeController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/paciente', PacienteController.store);
routes.get('/paciente', PacienteController.index);
routes.post('/paciente/listar', PacienteController.join);
routes.delete('/paciente/:id', PacienteController.delete);
routes.get('/paciente/:id', PacienteController.show);

routes.post('/medico', MedicoController.store);
routes.get('/medico', MedicoController.index);
routes.get('/medico/:id', MedicoController.show);
routes.delete('/medico/:id', MedicoController.delete);

routes.get('/Medico', NomeController.index);

routes.use(authMiddleware);
routes.put('/paciente/:id', PacienteController.update);
routes.put('/medico/:id', MedicoController.update);

export default routes;
