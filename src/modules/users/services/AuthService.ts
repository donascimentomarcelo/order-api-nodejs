import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
    password: string;
}

class AuthService {
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    public async auth({ email, password }: IRequest): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) throw new AppError('It has a user with that email');

        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed)
            throw new AppError('Incorrect email/password combination', 401);

        return user;
    }
}

export default AuthService;
