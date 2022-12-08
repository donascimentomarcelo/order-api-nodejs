import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';

const usersRouter = Router();
const controller = new UserController();
const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, controller.index);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    controller.create,
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    controller.upload,
);

export default usersRouter;
