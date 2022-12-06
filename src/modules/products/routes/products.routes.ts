import { Router } from 'express';
import ProductsController from '../controllers/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const controller = new ProductsController();

productsRouter.get('/', controller.index);
productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.show,
);

productsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    controller.create,
);

productsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    controller.update,
);

productsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    controller.delete,
);

export default productsRouter;
