import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import IProduct from '../models/IProduct';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({
            where: { name },
        });
    }

    public async findAllByIds(products: IProduct[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);
        return await this.find({
            where: {
                id: In(productIds),
            },
        });
    }
}
