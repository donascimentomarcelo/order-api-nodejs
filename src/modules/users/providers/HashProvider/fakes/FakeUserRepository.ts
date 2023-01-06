import User from '@modules/users/typeorm/entities/User';
import IUserRepository from '@modules/users/typeorm/repositories/IUsersRepository';
import { v4 as uuidv4 } from 'uuid';

class FakeUserRepository implements IUserRepository {
    private users: User[] = [];

    public async getAll(): Promise<User[]> {
        return this.users;
    }

    public async create({ name, email, password }: User): Promise<User> {
        const user = new User();

        user.id = uuidv4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }

    public async remove(id: string): Promise<void> {
        this.users.forEach((item, index) => {
            if (item.id === id) this.users.splice(index, 1);
        });
    }

    public async findAll(): Promise<User[]> {
        return this.users;
    }

    public async findByName(name: string): Promise<User | undefined> {
        return this.users.find(user => user.name === name);
    }

    public async findById(id: string): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}

export default FakeUserRepository;
