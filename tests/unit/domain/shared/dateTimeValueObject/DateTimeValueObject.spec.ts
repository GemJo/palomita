import DateTimeValueObject from '@/domain/shared/dateTimeValueObject/DateTimeValueObject';
import DateTimeValueObjectValidationException
  from '@/domain/shared/dateTimeValueObject/DateTimeValueObjectValidationException';

const correctDatesProviders = [
  {
    provide: '2022-09-02',
    expected: '2022-09-02',
  },
  {
    provide: '2022-08-24T17:36:10.307Z',
    expected: '2022-08-24',
  },
  {
    provide: '2022-08-13T17:36:10+00:00',
    expected: '2022-08-13',
  },
];

const incorrectDatesProvides = [
  '2022-13-01',
  '2022-10-41',
  '02/09/2022',
  'abc',
  '1234',
];

describe('Data time value object', () => {
  it.each(incorrectDatesProvides)('must fail with invalid date', (value) => {
    expect(() => DateTimeValueObject.fromString(value))
      .toThrow(DateTimeValueObjectValidationException);
    expect(() => DateTimeValueObject.fromString(value))
      .toThrow(`Date '${value}' is invalid`);
  });

  it.each(correctDatesProviders)('must create date', (value) => {
    const date = DateTimeValueObject.fromString(value.provide);
    expect(date).toBeInstanceOf(DateTimeValueObject);
    expect(date.toDateString()).toEqual(value.expected);
  });
});
