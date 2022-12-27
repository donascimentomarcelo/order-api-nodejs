import Customer from '@modules/customers/typeorm/entities/Customer';
import IProduct from './IProduct';

export default interface IOrder {
    customer: Customer;
    products: IProduct[];
}
