import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBcryptHashProvider';
import FakeUserRepository from '../providers/HashProvider/fakes/FakeUserRepository';
import UserService from './UserService';

describe('UserService', () => {
    let fakeUserRepository: FakeUserRepository;
    let fakeHashProvider: FakeHashProvider;
    let userService: UserService;

    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        userService = new UserService(fakeUserRepository, fakeHashProvider);
    });

    it('Should be able to create a new user', async () => {
        const user = await userService.create({
            name: 'Crane',
            email: 'crane@email.com',
            password: '1234',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should fail with duplicated email', async () => {
        await userService.create({
            name: 'Crane',
            email: 'crane@email.com',
            password: '1234',
        });

        expect(
            userService.create({
                name: 'Crane',
                email: 'crane@email.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
