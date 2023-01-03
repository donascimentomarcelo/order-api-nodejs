import { ICustomerCreate } from '../../../domain/models/ICustomerCreate';
import { ICustomerRepository } from '../ICustomerRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Customer from '../../entities/Customer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import IPaginate from '@shared/models/IPaginate';

@EntityRepository(Customer)
export class CustomerRepository implements ICustomerRepository {
    private customerRepository: Repository<Customer>;

    constructor() {
        this.customerRepository = getRepository(Customer);
    }

    public async create({ name, email }: ICustomerCreate): Promise<ICustomer> {
        const customer = this.customerRepository.create({ name, email });
        return await this.save(customer);
    }

    public async save(customer: Customer): Promise<ICustomer> {
        return await this.customerRepository.save(customer);
    }

    public async findByName(name: string): Promise<ICustomer | undefined> {
        return this.customerRepository.findOne({
            where: { name },
        });
    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {
        return this.customerRepository.findOne({
            where: { email },
        });
    }

    public async findById(id: string): Promise<ICustomer | undefined> {
        return this.customerRepository.findOne({
            where: { id },
        });
    }

    public async paginate(): Promise<IPaginate> {
        return (await this.customerRepository
            .createQueryBuilder()
            .paginate()) as IPaginate;
    }

    public delete(id: string): void {
        this.customerRepository.delete(id);
    }
}
