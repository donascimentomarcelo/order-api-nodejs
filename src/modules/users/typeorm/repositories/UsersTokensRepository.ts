import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UsersTokensRepository extends Repository<UserToken> {
    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.findOne({
            where: { token },
        });
    }

    public async findById(id: string): Promise<UserToken | undefined> {
        return this.findOne({
            where: { id },
        });
    }

    public async generate(user_id: string): Promise<UserToken> {
        const token = await this.create({
            user_id,
        });

        return await this.save(token);
    }
}
