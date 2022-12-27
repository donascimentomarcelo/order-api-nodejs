import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

export default class OrdersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const orderService = new OrderService();
        const order = await orderService.findById({ id });
        return response.json(order);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { customer_id, products } = request.body;
        const orderService = new OrderService();
        const order = await orderService.create({ customer_id, products });
        return response.json(order);
    }
}
