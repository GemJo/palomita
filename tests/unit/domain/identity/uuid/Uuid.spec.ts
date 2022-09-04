import Uuid from '@/domain/identity/uuid/Uuid';
import UuidValidationException from '@/domain/identity/uuid/UuidValidationException';

describe('Uuid', () => {
  it('must throw error if Uuid is not valid', () => {
    expect(() => Uuid.fromString('abc1')).toThrowError(UuidValidationException);
  });

  it('must generate Uuid', () => {
    const id = Uuid.generate();
    expect(id).toBeInstanceOf(Uuid);
  });

  it('must return false if id is not equals', () => {
    const firstId = Uuid.generate();
    const secondId = Uuid.generate();
    expect(firstId.isEquals(secondId)).toBeFalsy();
  });

  it('must return true if id is equals', () => {
    const idGenerated = Uuid.generate();
    const id = Uuid.fromString(idGenerated.toString());
    expect(id.isEquals(idGenerated)).toBeTruthy();
  });
});
