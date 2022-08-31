export default class MovieGenreValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MovieGenreValidationException';
  }

  public static fromKey(key: string): MovieGenreValidationException {
    return new this(`There is no genre with this key '${key}'`);
  }

  public static fromId(id: number): MovieGenreValidationException {
    return new this(`There is no genre with this id '${id}'`);
  }
}
