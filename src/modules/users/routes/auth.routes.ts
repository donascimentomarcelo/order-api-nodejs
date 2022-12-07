import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthController from '../controllers/AuthController';

const authRouter = Router();
const controller = new AuthController();

authRouter.post(
    '/authenticate',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    controller.authenticate,
);

export default authRouter;
