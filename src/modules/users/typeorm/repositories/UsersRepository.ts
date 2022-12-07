import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        return this.findOne({
            where: { name },
        });
    }
    public async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({
            where: { email },
        });
    }
    public async findById(id: string): Promise<User | undefined> {
        return this.findOne({
            where: { id },
        });
    }
}
