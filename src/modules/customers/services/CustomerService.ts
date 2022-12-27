import { CustomersRepository } from './../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import IPaginate from '@shared/models/IPaginate';

interface IRequest {
    id?: string;
    name: string;
    email: string;
}

class CustomerService {
    public customersRepository: CustomersRepository;

    constructor() {
        this.customersRepository = getCustomRepository(CustomersRepository);
    }

    public async create({
        name,
        email,
    }: IRequest): Promise<Customer | undefined> {
        const customerExists = await this.customersRepository.findByEmail(
            email,
        );

        if (customerExists)
            throw new AppError('It has a Customer with that email');

        const customer = this.customersRepository.create({
            name,
            email,
        });

        return await this.customersRepository.save(customer);
    }

    public async getAll(): Promise<IPaginate> {
        return (await this.customersRepository
            .createQueryBuilder()
            .paginate()) as IPaginate;
    }

    public async getById(id: string): Promise<Customer | undefined> {
        return await this.customersRepository.findOne(id);
    }

    public async update({ name, email, id }: IRequest): Promise<Customer> {
        if (!id) throw new AppError('Id is missing!');

        const customer = await this.getById(id);

        if (!customer) throw new AppError('Customer not found!');

        const customerExists = await this.customersRepository.findByEmail(
            customer.email,
        );

        if (customerExists && customerExists.id !== id)
            throw new AppError(
                'There is already one Customer with this email!',
            );

        customer.name = name;
        customer.email = email;

        await this.customersRepository.save(customer);

        return customer;
    }

    public async delete(id: string): Promise<void> {
        await this.customersRepository.delete(id);
    }
}

export default CustomerService;
