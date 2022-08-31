export default class MovieRatingValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MovieRatingValidationException';
  }

  public static fromRatingAboveFive(rating: number): MovieRatingValidationException {
    return new this(`Rating '${rating}' is above than 10`);
  }

  public static fromRatingBelowZero(rating: number): MovieRatingValidationException {
    return new this(`Rating '${rating}' is below than 0`);
  }
}
