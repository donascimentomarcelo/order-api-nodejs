import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';

export default class CustomersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const users = await container.resolve(CustomerService).getAll();
        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email } = request.body;
        const user = await container
            .resolve(CustomerService)
            .create({ name, email });
        return response.json(user);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const user = await container.resolve(CustomerService).getById(id);
        return response.json(user);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const id = request.user.id;
        const { name, email } = request.body;

        const user = await container.resolve(CustomerService).update({
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
        await container.resolve(CustomerService).delete(id);
        return response.json([]);
    }
}
