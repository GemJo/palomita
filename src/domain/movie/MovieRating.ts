import MovieRatingValidationException from '@/domain/movie/MovieRatingValidationException';

export default class MovieRating {
  private readonly rating: number;

  constructor(rating: number) {
    MovieRating.isValidOrFail(rating);
    this.rating = rating;
  }

  private static isValidOrFail(rating: number) {
    if (rating > 10) {
      throw MovieRatingValidationException.fromRatingAboveFive(rating);
    }

    if (rating < 0) {
      throw MovieRatingValidationException.fromRatingBelowZero(rating);
    }
  }

  toNumber(): number {
    return this.rating;
  }

  toString(): string {
    return `${this.rating}`;
  }
}
