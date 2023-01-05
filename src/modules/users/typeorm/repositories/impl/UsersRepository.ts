import { EntityRepository, Repository } from 'typeorm';
import User from '../../entities/User';
import IUserRepository from '../IUsersRepository';

@EntityRepository(User)
export class UserRepository
    extends Repository<User>
    implements IUserRepository
{
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
