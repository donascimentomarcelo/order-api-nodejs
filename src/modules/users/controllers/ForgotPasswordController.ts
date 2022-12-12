import { Request, Response } from 'express';
import ForgotPasswordService from '../services/ForgotPasswordService';

export default class ForgotPasswordController {
    public async createToken(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const forgotPasswordService = new ForgotPasswordService();
        await forgotPasswordService.generateToken({
            email,
        });
        return response.status(204).json();
    }

    public async resetPassword(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;
        const forgotPasswordService = new ForgotPasswordService();
        await forgotPasswordService.resetPassword({
            password,
            token,
        });
        return response.status(204).json();
    }
}
