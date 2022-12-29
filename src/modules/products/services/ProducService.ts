import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    id?: string;
    name: string;
    price: number;
    quantity: number;
}

class ProductService {
    public productsRepository: ProductRepository;
    public redisCache: RedisCache;

    constructor() {
        this.productsRepository = getCustomRepository(ProductRepository);
        this.redisCache = new RedisCache();
    }

    public async create({ name, price, quantity }: IRequest): Promise<Product> {
        const productExists = await this.productsRepository.findByName(name);

        if (productExists)
            throw new AppError('It has a product with that name');

        const product = this.productsRepository.create({
            name,
            price,
            quantity,
        });

        await this.redisCache.invalidate('api-order');

        return await this.productsRepository.save(product);
    }

    public async getAll(): Promise<Product[]> {
        let products = await this.redisCache.recover<Product[]>('api-order');

        if (!products) {
            products = await this.productsRepository.find();
            await this.redisCache.save('api-order', products);
        }

        return products;
    }

    public async getById(id: string): Promise<Product | undefined> {
        return await this.productsRepository.findOne(id);
    }

    public async update({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const product = await this.productsRepository.findOne(id);

        if (!product) throw new AppError('Product does not exist!');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return await this.productsRepository.save(product);
    }

    public async delete(id: string): Promise<void> {
        await this.redisCache.invalidate('api-order');
        await this.productsRepository.delete(id);
    }
}

export default ProductService;
