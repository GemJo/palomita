import { v4, validate, version } from 'uuid';
import UuidValidationException from '@/domain/identity/uuid/UuidValidationException';

export default class Uuid {
  private readonly id: string;

  protected constructor(id: string) {
    Uuid.isValidOrFail(id);
    this.id = id;
  }

  private static isValidOrFail(id: string): void {
    if (!validate(id) || version(id) !== 4) {
      throw new UuidValidationException(id);
    }
  }

  public static fromString(id: string): Uuid {
    return new this(id);
  }

  public static generate(): Uuid {
    return new this(v4());
  }

  public isEquals(id: Uuid): boolean {
    return this.id === id.toString();
  }

  public toString(): string {
    return this.id;
  }
}
