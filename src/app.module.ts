import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from 'config/config.module';
import { ConfigService } from 'config/config.service';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [ConfigService],
})
export class AppModule {}
