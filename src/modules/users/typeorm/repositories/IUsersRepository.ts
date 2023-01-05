import User from '../entities/User';

export default interface IUserRepository {
    findByName(name: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}
