import StringValueObject from '@/domain/shared/stringValueObject/StringValueObject';
import StringValueObjectValidationException
  from '@/domain/shared/stringValueObject/StringValueObjectValidationException';
import StringMother from './StringMother';

class TestString extends StringValueObject {
  static min = 3;

  static max = 10;
}

describe('String value object', () => {
  it('must fail with empty string', () => {
    expect(() => StringValueObject.fromString(''))
      .toThrow(StringValueObjectValidationException);
    expect(() => StringValueObject.fromString(''))
      .toThrowError('The value \'\' is shorter than min length of 1');

    expect(() => StringValueObject.fromString('  '))
      .toThrow(StringValueObjectValidationException);
    expect(() => StringValueObject.fromString('  '))
      .toThrowError(`The value '' is shorter than min length of ${StringValueObject.min}`);
  });

  it('must fail with string longer than max', () => {
    const length = StringValueObject.max;
    const text: string = StringMother.fromLength(length + 1);
    expect(() => StringValueObject.fromString(text))
      .toThrow(StringValueObjectValidationException);
    expect(() => StringValueObject.fromString(text))
      .toThrowError(`The value '${text}' is longer than max length of ${length}`);
  });

  it('must create string', () => {
    const text = 'Hello world!';
    const string = StringValueObject.fromString(text);
    expect(string).toBeInstanceOf(StringValueObject);
    expect(string.toString()).toEqual(text);
  });

  it('must fail string when static max is modified and string is longer', () => {
    const text = StringMother.fromLength(TestString.max + 1);
    expect(() => TestString.fromString(text)).toThrow(StringValueObjectValidationException);
    expect(() => TestString.fromString(text))
      .toThrowError(`The value '${text}' is longer than max length of ${TestString.max}`);
  });

  it('must created string when static max is modified', () => {
    const text = StringMother.fromLength(TestString.max);
    const string = TestString.fromString(text);
    expect(string).toBeInstanceOf(StringValueObject);
    expect(string.toString()).toEqual(text);
  });

  it('must fail string when static min is modified and string is longer', () => {
    const text = StringMother.fromLength(TestString.min - 1);
    expect(() => TestString.fromString(text)).toThrow(StringValueObjectValidationException);
    expect(() => TestString.fromString(text))
      .toThrowError(`The value '${text}' is shorter than min length of ${TestString.min}`);
  });

  it('must created string when static max is modified', () => {
    const text = StringMother.fromLength(TestString.min);
    const string = TestString.fromString(text);
    expect(string).toBeInstanceOf(StringValueObject);
    expect(string.toString()).toEqual(text);
  });
});
