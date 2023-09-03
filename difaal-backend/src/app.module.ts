import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdvertisementModule } from './advertisement/advertisement.module';

@Module({
  imports: [DatabaseModule , ConfigModule.forRoot({ isGlobal: true}),AuthModule, UserModule, AdvertisementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
