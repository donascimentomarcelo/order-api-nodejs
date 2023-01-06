import IUserCreate from '../entities/IUserCreate';
import User from '../entities/User';

export default interface IUserRepository {
    getAll(): Promise<User[]>;
    findByName(name: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
    create({ name, email, password }: IUserCreate): Promise<User>;
    save(user: IUserCreate): Promise<User>;
    remove(id: string): void;
}
