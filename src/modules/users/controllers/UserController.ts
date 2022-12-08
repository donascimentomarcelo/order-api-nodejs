import UserService from '@modules/users/services/UserService';
import { Request, Response } from 'express';
import ImageService from '../services/ImageService';

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

    public async upload(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const imageService = new ImageService();
        const user = await imageService.upload({
            user_id: request.user.id,
            avatarFileName: request.file ? request.file.filename : '',
        });
        return response.json(user);
    }
}
