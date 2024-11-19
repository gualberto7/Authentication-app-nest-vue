import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password } = createUserDto;
      const user = this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(password, 10),
      });

      await this.userRepository.save(user);
      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;
      let user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      });
      if (!user) throw new UnauthorizedException('Invalid credentials');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Invalid credentials');

      user = await this.userRepository.findOneBy({ email });

      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    console.log(error);
    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error.status == 401) throw new UnauthorizedException(error.message);

    throw new InternalServerErrorException('Something went wrong');
  }
}
