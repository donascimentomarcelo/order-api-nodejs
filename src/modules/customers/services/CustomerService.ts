import { ICustomerRepository } from '../typeorm/repositories/ICustomerRepository';
import { ICustomerUpdate } from './../domain/models/ICustomerUpdate';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import IPaginate from '@shared/models/IPaginate';
import { ICustomerCreate } from '../domain/models/ICustomerCreate';
import { injectable, inject } from 'tsyringe';

@injectable()
class CustomerService {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    public async create({
        name,
        email,
    }: ICustomerCreate): Promise<Customer | undefined> {
        const customerExists = await this.customerRepository.findByEmail(email);

        if (customerExists)
            throw new AppError('It has a Customer with that email');

        return await this.customerRepository.create({
            name,
            email,
        });
    }

    public async getAll(): Promise<IPaginate> {
        return this.customerRepository.paginate();
    }

    public async getById(id: string): Promise<Customer | undefined> {
        return await this.customerRepository.findById(id);
    }

    public async update({
        name,
        email,
        id,
    }: ICustomerUpdate): Promise<Customer> {
        if (!id) throw new AppError('Id is missing!');

        const customer = await this.getById(id);

        if (!customer) throw new AppError('Customer not found!');

        const customerExists = await this.customerRepository.findByEmail(
            customer.email,
        );

        if (customerExists && customerExists.id !== id)
            throw new AppError(
                'There is already one Customer with this email!',
            );

        customer.name = name;
        customer.email = email;

        await this.customerRepository.save(customer);

        return customer;
    }

    public async delete(id: string): Promise<void> {
        await this.customerRepository.delete(id);
    }
}

export default CustomerService;
