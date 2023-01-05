import { IHashProvider } from './HashProvider/models/IHashProvider';
import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/impl/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
