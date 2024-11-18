import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ReviewsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
