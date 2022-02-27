import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      const { username, password } = authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const user = this.userRepository.create({
        username,
        password: passwordHash,
      });
      const savedUser = await this.userRepository.save(user);

      if (savedUser && savedUser.id) {
        return this.getAccessToken(username);
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return this.getAccessToken(username);
    }

    throw new UnauthorizedException("Username or password doesn't match");
  }

  private getAccessToken(username: string): { accessToken: string } {
    const payload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
