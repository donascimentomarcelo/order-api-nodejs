import IOrder from '@modules/products/typeorm/models/IOrder';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        return this.findOne(id, {
            relations: ['order_products', 'customer'],
        });
    }

    public async createOrder({ customer, products }: IOrder): Promise<Order> {
        return await this.save(
            this.create({
                customer,
                order_products: products,
            }),
        );
    }
}
