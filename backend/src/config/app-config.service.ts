import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env() {
    return this.configService.get<string>('env');
  }

  get mongodb() {
    return this.configService.get<string>('MONGO_URL');
  }

  get jwt_secret() {
    return this.configService.get<string>('JWT_SECRET');
  }
}
