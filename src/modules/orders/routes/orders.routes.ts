import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const controller = new OrdersController();

ordersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.show,
);

ordersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().required(),
            products: Joi.array().required(),
        },
    }),
    controller.create,
);

export default ordersRouter;
