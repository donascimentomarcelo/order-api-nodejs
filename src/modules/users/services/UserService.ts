import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
}

class UserService {
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    public async create({
        name,
        email,
        password,
    }: IRequest): Promise<User | undefined> {
        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) throw new AppError('It has a user with that email');

        const hashedPassword = await hash(password, 8);

        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return await this.userRepository.save(user);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async getById(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne(id);
    }

    public async update({
        id,
        name,
        email,
        password,
    }: IRequest): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) throw new AppError('Product does not exist!');

        user.name = name;
        user.email = email;
        user.password = password;

        return await this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}

export default UserService;
