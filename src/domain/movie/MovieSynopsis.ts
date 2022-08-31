import StringValueObject from '@/domain/shared/stringValueObject/StringValueObject';

const MAX_LENGTH = 1000;

export default class MovieSynopsis extends StringValueObject {
  static max = MAX_LENGTH;
}
