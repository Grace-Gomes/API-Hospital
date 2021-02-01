import jwt from 'jsonwebtoken';
import { promosify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promosify(jwt.verify)(token, authConfig.secret);

        req.Pacienteid = decoded.id;
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
