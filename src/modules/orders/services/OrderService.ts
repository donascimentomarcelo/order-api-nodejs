import { ProductRepository } from './../../products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import { OrderRepository } from '../typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import Product from '@modules/products/typeorm/entities/Product';

interface IOrder {
    customer_id: string;
    products: IProduct[];
}

interface IProduct {
    id: string;
    quantity: number;
}

interface IFindId {
    id: string;
}

class OrderService {
    public ordersRepository: OrderRepository;
    public customersRepository: CustomersRepository;
    public productsRepository: ProductRepository;

    constructor() {
        this.ordersRepository = getCustomRepository(OrderRepository);
        this.customersRepository = getCustomRepository(CustomersRepository);
        this.productsRepository = getCustomRepository(ProductRepository);
    }

    public async create({ customer_id, products }: IOrder): Promise<Order> {
        const allProducts = await this.productsRepository.findByIds(products);

        const customer = await this.customersRepository.findById(customer_id);
        if (!customer) throw new AppError(`No customer`);

        const availableQuantity = this.getAvailableQuantity(
            products,
            allProducts,
        );

        if (availableQuantity.length)
            throw new AppError(
                `The quantity ${availableQuantity[0].quantity} is not available`,
            );

        const productsBuilt = this.buildProducts(products, allProducts);

        const order = await this.ordersRepository.createOrder({
            customer,
            products: productsBuilt,
        });

        const updatedQuantity = this.updateQuantity(order, allProducts);
        await this.productsRepository.save(updatedQuantity);

        return order;
    }

    public async findById({ id }: IFindId): Promise<Order> {
        const order = await this.ordersRepository.findById(id);
        if (!order) throw new AppError('Order not found');
        return order;
    }

    private updateQuantity(order: Order, allProducts: Product[]) {
        const { order_products } = order;
        return order_products.map(product => ({
            id: product.product_id,
            quantity:
                allProducts.filter(prod => prod.id === product.product_id)[0]
                    .quantity - product.quantity,
        }));
    }

    private buildProducts(products: IProduct[], allProducts: Product[]) {
        return products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: allProducts.filter(prod => prod.id === product.id)[0].price,
        }));
    }

    private getAvailableQuantity(
        products: IProduct[],
        allProducts: Product[],
    ): IProduct[] {
        return products.filter(
            product =>
                allProducts.filter(prod => prod.id === product.id)[0].quantity <
                product.quantity,
        );
    }
}

export default OrderService;
