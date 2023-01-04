import { ICustomerCreate } from '../../../domain/models/ICustomerCreate';
import { ICustomerRepository } from '../ICustomerRepository';
import { EntityRepository } from 'typeorm';
import Customer from '../../entities/Customer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import IPaginate from '@shared/models/IPaginate';
import { v4 as uuidV4 } from 'uuid';
import Paginate from '@shared/models/Paginate';

@EntityRepository(Customer)
export class FakeCustomerRepository implements ICustomerRepository {
    private customers: Customer[] = [];

    public async create({ name, email }: ICustomerCreate): Promise<ICustomer> {
        const customer = new Customer();
        customer.id = uuidV4();
        customer.name = name;
        customer.email = email;
        this.customers.push(customer);
        return customer;
    }

    public async save(customer: Customer): Promise<ICustomer> {
        Object.assign(this.customers, customer);
        return customer;
    }

    public async findByName(name: string): Promise<ICustomer | undefined> {
        return this.customers.find(customer => customer.name === name);
    }

    public async findByEmail(email: string): Promise<ICustomer | undefined> {
        return this.customers.find(customer => customer.email === email);
    }

    public async findById(id: string): Promise<ICustomer | undefined> {
        return this.customers.find(customer => customer.id === id);
    }

    public async paginate(): Promise<IPaginate> {
        const paginate = new Paginate();
        paginate.data.push(this.customers);
        return paginate;
    }

    public delete(id: string): void {
        this.customers.forEach((item, index) => {
            if (item.id === id) this.customers.splice(index, 1);
        });
    }
}
