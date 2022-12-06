import { Router } from 'express';
import ProductsController from '../controllers/ProductController';

const productsRouter = Router();

productsRouter.get('/', new ProductsController().index);
productsRouter.get('/:id', new ProductsController().show);
productsRouter.post('/', new ProductsController().create);
productsRouter.put('/:id', new ProductsController().update);
productsRouter.delete('/:id', new ProductsController().delete);

export default productsRouter;
