import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest {
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
}
