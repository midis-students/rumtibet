import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from './config/app-config.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return {
          uri: configService.mongodb,
        };
      },
    }),
    AuthModule,
    AppConfigModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
