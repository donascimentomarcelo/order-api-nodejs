import { Request, Response } from 'express';
import ProductService from '../services/ProducService';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const productService = new ProductService();
        const product = await productService.getAll();
        return response.json(product);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const productService = new ProductService();
        const product = await productService.getById(id);
        return response.json(product);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const productService = new ProductService();
        const product = await productService.create({ name, price, quantity });
        return response.json(product);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;
        const productService = new ProductService();
        const product = await productService.update({
            id,
            name,
            price,
            quantity,
        });
        return response.json(product);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const productService = new ProductService();
        await productService.delete(id);
        return response.json([]);
    }
}
