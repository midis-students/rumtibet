import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/entities/user.entity';
import { SignInDTO } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn(dto: SignInDTO) {
    const user = await this.usersService.findByEmail(dto.email);

    const equals = await this.comparePassword(dto.password, user.password);
    if (!equals) {
      throw new UnauthorizedException();
    }

    return this.generateAccessToken(user);
  }

  async register(dto: RegisterDTO) {
    let user = await this.usersService.findByEmail(dto.email);
    if (user) {
      throw new UnauthorizedException('this email already registered');
    }

    user = await this.usersService.create({
      ...dto,
      password: await this.encryptPassword(dto.password),
    });

    return this.generateAccessToken(user);
  }

  private encryptPassword(password: string) {
    return bcrypt.genSalt(10).then((salt) => bcrypt.hash(password, salt));
  }

  private comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  private async generateAccessToken(user: UserDocument) {
    const payload = { id: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
