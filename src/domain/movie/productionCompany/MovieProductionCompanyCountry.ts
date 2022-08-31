import StringValueObject from '@/domain/shared/stringValueObject/StringValueObject';

const COUNTRY_CODE_LENGTH = 2;

export default class MovieProductionCompanyCountry extends StringValueObject {
  static min = COUNTRY_CODE_LENGTH;

  static max = COUNTRY_CODE_LENGTH;
}
