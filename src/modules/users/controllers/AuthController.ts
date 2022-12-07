import AuthService from '../services/AuthService';
import { Request, Response } from 'express';

export default class AuthController {
    public async authenticate(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const authService = new AuthService();
        const user = await authService.auth({ email, password });
        return response.json(user);
    }
}
