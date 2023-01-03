import { ICustomerCreate } from '../../domain/models/ICustomerCreate';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import IPaginate from '@shared/models/IPaginate';

export interface ICustomerRepository {
    findByName(name: string): Promise<ICustomer | undefined>;
    findByEmail(email: string): Promise<ICustomer | undefined>;
    findById(id: string): Promise<ICustomer | undefined>;
    create({ name, email }: ICustomerCreate): Promise<ICustomer>;
    save(customer: ICustomer): Promise<ICustomer>;
    paginate(): Promise<IPaginate>;
    delete(id: string): void;
}
