import { UserRepository } from './../typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from './../typeorm/repositories/UsersTokensRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

interface IResetPasswordRequest {
    token: string;
    password: string;
}

class ForgotPasswordService {
    public usersTokensRepository: UsersTokensRepository;
    public userRepository: UserRepository;

    constructor() {
        this.usersTokensRepository = getCustomRepository(UsersTokensRepository);
        this.userRepository = getCustomRepository(UserRepository);
    }

    public async generateToken({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new AppError('User not found');

        const { token } = await this.usersTokensRepository.generate(user.id);

        const template = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Order API - Password Recovery',
            templateData: {
                template: template,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    }

    public async resetPassword({
        token,
        password,
    }: IResetPasswordRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByToken(token);

        if (!userToken) throw new AppError('User token does not exists');

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) throw new AppError('User does not exists');

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate))
            throw new AppError('Token expired');

        user.password = await hash(password, 8);
        await this.userRepository.save(user);
    }
}

export default ForgotPasswordService;
