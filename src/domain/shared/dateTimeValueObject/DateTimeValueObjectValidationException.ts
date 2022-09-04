export default class DateTimeValueObjectValidationException extends Error {
  public name: string;

  constructor(date: string) {
    super(`Date '${date}' is invalid`);
    this.name = 'DateTimeValueObjectValidationException';
  }
}
