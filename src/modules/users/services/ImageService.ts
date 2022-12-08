import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class ImageService {
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    public async upload({
        user_id,
        avatarFileName,
    }: IRequest): Promise<User | undefined> {
        const user = await this.userRepository.findById(user_id);

        if (!user) throw new AppError('User not found');

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists)
                await fs.promises.unlink(userAvatarFilePath);
        }

        user.avatar = avatarFileName;

        return await this.userRepository.save(user);
    }
}

export default ImageService;
