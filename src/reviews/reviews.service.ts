import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UDEMY_BASE_URL } from './constants';

@Injectable()
export class ReviewsService {
  private readonly secretToken =
    this.configService.getOrThrow<string>('UDEMY_SECRET_TOKEN');

  constructor(private readonly configService: ConfigService) {}

  async getReviews(page: number) {
    const res = await fetch(
      `${UDEMY_BASE_URL}/taught-courses/reviews/?status=commented&star=4,5&page=${page}&page_size=9`,
      {
        headers: {
          authorization: `Bearer ${this.secretToken}`,
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    );

    return res.json();
  }
}
