import PersonalInfoRatingValidationException from '@/domain/yourMovie/personalInfo/PersonalInfoRatingValidationException';

export default class PersonalInfoRating {
  private readonly rating: number;

  constructor(rating: number) {
    PersonalInfoRating.isValidOrFail(rating);
    this.rating = rating;
  }

  private static isValidOrFail(rating: number) {
    if (rating > 5) {
      throw PersonalInfoRatingValidationException.fromRatingAboveFive(rating);
    }

    if (rating < 0) {
      throw PersonalInfoRatingValidationException.fromRatingBelowZero(rating);
    }
  }

  toNumber(): number {
    return this.rating;
  }

  toString(): string {
    return `${this.rating}`;
  }
}
