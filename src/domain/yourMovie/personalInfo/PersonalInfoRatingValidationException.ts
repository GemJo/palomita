export default class PersonalInfoRatingValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MovieRatingValidationException';
  }

  public static fromRatingAboveFive(rating: number): PersonalInfoRatingValidationException {
    return new this(`Rating '${rating}' is above than 5`);
  }

  public static fromRatingBelowZero(rating: number): PersonalInfoRatingValidationException {
    return new this(`Rating '${rating}' is below than 0`);
  }
}
