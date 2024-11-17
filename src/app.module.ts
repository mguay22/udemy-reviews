import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ReviewsModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
