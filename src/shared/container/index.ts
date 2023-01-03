import { CustomerRepository } from '@modules/customers/typeorm/repositories/impl/CustomerRepository';
import { ICustomerRepository } from '../../modules/customers/typeorm/repositories/ICustomerRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    CustomerRepository,
);
