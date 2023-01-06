import { EntityRepository, Repository, getRepository } from 'typeorm';
import IUserCreate from '../../entities/IUserCreate';
import User from '../../entities/User';
import IUserRepository from '../IUsersRepository';

@EntityRepository(User)
export class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findByName(name: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { name },
        });
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { email },
        });
    }
    public async findById(id: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    public async create({ name, email, password }: IUserCreate): Promise<User> {
        const user = this.userRepository.create({ name, email, password });
        return await this.save(user);
    }
    public async save(user: IUserCreate): Promise<User> {
        return await this.userRepository.save(user);
    }
    public remove(id: string): void {
        this.userRepository.delete(id);
    }
}
