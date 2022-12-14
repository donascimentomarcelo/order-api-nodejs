import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';

export default class CustomersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const customerService = new CustomerService();
        const users = await customerService.getAll();
        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;
        const customerService = new CustomerService();
        const user = await customerService.create({ name, email });
        return response.json(user);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const customerService = new CustomerService();
        const { id } = request.user;

        const user = await customerService.getById(id);
        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const { name, email } = request.body;
        const customerService = new CustomerService();

        const user = await customerService.update({
            id,
            name,
            email,
        });
        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const customerService = new CustomerService();
        await customerService.delete(id);
        return response.json([]);
    }
}
