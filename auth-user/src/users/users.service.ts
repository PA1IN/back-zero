import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email }});
    }

    create(userData: Partial<User>): Promise<User> {
        const usuarioNuevo = this.usersRepository.create(userData);
        return this.usersRepository.save(usuarioNuevo);
    }

    async findById(id: number):Promise<User | null>
    {
        return this.usersRepository.findOne({ where: { id }})
    }
}