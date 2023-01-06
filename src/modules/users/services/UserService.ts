import { IHashProvider } from './../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../typeorm/entities/User';
import IUserRepository from '../typeorm/repositories/IUsersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
    password: string;
}
interface IRequestCreate {
    name: string;
    email: string;
    password: string;
}

interface IProfile {
    user_id: string;
    id?: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

@injectable()
class UserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async create({
        name,
        email,
        password,
    }: IRequestCreate): Promise<User | undefined> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) throw new AppError('It has a user with that email');

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return await this.userRepository.save(user);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    public async getById(id: string): Promise<User | undefined> {
        return await this.userRepository.findById(id);
    }

    public async update({
        id,
        name,
        email,
        password,
    }: IRequest): Promise<User> {
        const user = await this.getById(id);

        if (!user) throw new AppError('User not found!');

        user.name = name;
        user.email = email;
        user.password = password;

        return await this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.remove(id);
    }

    public async updateProfile({
        name,
        email,
        password,
        user_id,
        old_password,
    }: IProfile): Promise<User> {
        const user = await this.getById(user_id);

        if (!user) throw new AppError('User not found!');

        const userUpdateEmail = await this.userRepository.findByEmail(
            user.email,
        );

        if (userUpdateEmail && userUpdateEmail.id !== user_id)
            throw new AppError('There is already one user with this email!');

        if (password && !old_password)
            throw new AppError('Old password is required.');

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(
                old_password,
                user.password,
            );

            if (!checkOldPassword)
                throw new AppError('Old password does not match.');

            user.password = await this.hashProvider.generateHash(password);
        }

        user.name = name;
        user.email = email;

        await this.userRepository.save(user);

        return user;
    }
}

export default UserService;
