import UserService from '@modules/users/services/UserService';
import { Request, Response } from 'express';

export default class UserController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const userService = new UserService();
        const users = await userService.getAll();
        return response.json(users);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;
        const userService = new UserService();
        const user = await userService.create({ name, email, password });
        return response.json(user);
    }
}
