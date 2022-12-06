import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest {
    id?: string;
    name: string;
    price: number;
    quantity: number;
}

class ProductService {
    public async create({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists)
            throw new AppError('It has a product with that name');

        const product = productsRepository.create({ name, price, quantity });
        return await productsRepository.save(product);
    }

    public async getAll(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductRepository);
        return await productsRepository.find();
    }

    public async getById(id: string): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);
        return await productsRepository.findOne(id);
    }

    public async update({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);

        if (!product) throw new AppError('Product does not exist!');

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return await productsRepository.save(product);
    }

    public async delete(id: string): Promise<void> {
        const productsRepository = getCustomRepository(ProductRepository);
        await productsRepository.delete(id);
    }
}

export default ProductService;
