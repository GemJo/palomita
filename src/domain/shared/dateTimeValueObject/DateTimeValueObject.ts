import DateTimeValueObjectValidationException
  from '@/domain/shared/dateTimeValueObject/DateTimeValueObjectValidationException';

const DATE_FORMAT = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

export default class DateTimeValueObject {
  private readonly date: Date;

  protected constructor(value: string) {
    DateTimeValueObject.isValidOrFail(value);
    this.date = new Date(value);
  }

  private static isValidOrFail(date: string): void {
    if (!date.match(DATE_FORMAT) || new Date(date).toString() === 'Invalid Date') {
      throw new DateTimeValueObjectValidationException(date);
    }
  }

  public static generate(): DateTimeValueObject {
    return new this(new Date().toISOString());
  }

  public static fromString(date: string): DateTimeValueObject {
    return new this(date);
  }

  public toString(): string {
    return this.date.toString();
  }

  public toISOString() {
    return this.date.toISOString();
  }

  public toDateString(): string {
    return `${this.date.getUTCFullYear()}-${String(this.date.getUTCMonth() + 1).padStart(2, '0')}-${String(this.date.getUTCDate()).padStart(2, '0')}`;
  }
}
