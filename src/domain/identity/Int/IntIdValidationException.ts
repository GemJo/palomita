export default class IntIdValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MovieIdValidationException';
  }

  public static fromNumberIsNotInteger(id: number): IntIdValidationException {
    return new this(`The number '${id}' is not a integer number`);
  }

  public static fromNumberIsBelowZero(id: number): IntIdValidationException {
    return new this(`The number '${id}' is below 0`);
  }
}
