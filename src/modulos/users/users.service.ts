import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await this.userRepository.findOneBy({
        nombre_usuario: username,
      });

      if (user) {
        return user;
      }

      return undefined;
    } catch (error) {
      throw error;
    }
  }
}
