import { CustomerRepository } from '@modules/customers/typeorm/repositories/impl/CustomerRepository';
import { ICustomerRepository } from '../../modules/customers/typeorm/repositories/ICustomerRepository';
import { container } from 'tsyringe';
import IUserRepository from '@modules/users/typeorm/repositories/IUsersRepository';
import { UserRepository } from '@modules/users/typeorm/repositories/impl/UsersRepository';

import '@modules/users/providers';

container.registerSingleton<ICustomerRepository>(
    'CustomerRepository',
    CustomerRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
