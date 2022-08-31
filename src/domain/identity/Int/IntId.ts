import IntIdValidationException from '@/domain/identity/Int/IntIdValidationException';

export default class IntId {
  private readonly id: number;

  protected constructor(id: number) {
    IntId.isValidOrFail(id);
    this.id = id;
  }

  private static isValidOrFail(id: number) {
    if (!Number.isInteger(id)) {
      throw IntIdValidationException.fromNumberIsNotInteger(id);
    }

    if (id <= 0) {
      throw IntIdValidationException.fromNumberIsBelowZero(id);
    }
  }

  public static fromString(id: string): IntId {
    return new this(Number(id));
  }

  public static fromInt(id: number): IntId {
    return new this(id);
  }

  public toString(): string {
    return `${this.id}`;
  }

  public toInt(): number {
    return this.id;
  }
}
