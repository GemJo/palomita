export default class StringValueObjectValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'StringValueObjectValidationException';
  }

  public static fromValueTooShort(value: string, min: number)
    : StringValueObjectValidationException {
    return new this(`The value '${value}' is shorter than min length of ${min}`);
  }

  public static fromValueTooLong(value: string, max: number)
    : StringValueObjectValidationException {
    return new this(`The value '${value}' is longer than max length of ${max}`);
  }
}
