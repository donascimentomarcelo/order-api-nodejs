import AppError from '@shared/errors/AppError';
import { FakeCustomerRepository } from './../typeorm/repositories/fakes/FakeCustomerRepository';
import CustomerService from './CustomerService';
describe('CustomerService', () => {
    let fakeCustomerRepository: FakeCustomerRepository;
    let customerService: CustomerService;

    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomerRepository();
        customerService = new CustomerService(fakeCustomerRepository);
    });

    it('Should be able to create a new customer', async () => {
        const customer = await customerService.create({
            name: 'Crane',
            email: 'crane@email.com',
        });

        expect(customer).toHaveProperty('id');
    });

    it('Should fail with duplicated email', async () => {
        await customerService.create({
            name: 'Crane',
            email: 'crane@email.com',
        });

        expect(
            customerService.create({
                name: 'Crane',
                email: 'crane@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
