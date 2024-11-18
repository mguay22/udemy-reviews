import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller('reviews')
@UseInterceptors(CacheInterceptor)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviews(@Query('page') page: number) {
    return this.reviewsService.getReviews(page);
  }
}
