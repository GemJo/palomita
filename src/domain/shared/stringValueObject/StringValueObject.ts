import StringValueObjectValidationException
  from '@/domain/shared/stringValueObject/StringValueObjectValidationException';

const MIN_LENGTH = 1;
const MAX_LENGTH = 500;

export default class StringValueObject {
  protected static min: number = MIN_LENGTH;

  protected static max: number = MAX_LENGTH;

  private readonly value: string;

  protected constructor(value: string, min: number, max: number) {
    const valueTrimmed = value.trim();
    StringValueObject.isValidOrFail(valueTrimmed, min, max);
    this.value = valueTrimmed;
  }

  private static isValidOrFail(value: string, min: number, max: number): void {
    if (value.length < min) {
      throw StringValueObjectValidationException.fromValueTooShort(value, min);
    }

    if (value.length > max) {
      throw StringValueObjectValidationException.fromValueTooLong(value, max);
    }
  }

  public static fromString(value: string): StringValueObject {
    return new this(value, this.min, this.max);
  }

  public toString(): string {
    return this.value;
  }
}
