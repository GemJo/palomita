export default class MovieBuilderValidationException extends Error {
  public name: string;

  constructor(message: string) {
    super(message);
    this.name = 'MovieBuilderValidationException';
  }

  public static fromMovieId(): MovieBuilderValidationException {
    return new this('Id is a mandatory value');
  }

  public static fromTitle(): MovieBuilderValidationException {
    return new this('Title is a mandatory value');
  }

  public static fromOriginalTitle(): MovieBuilderValidationException {
    return new this('Original title is a mandatory value');
  }

  public static fromRating(): MovieBuilderValidationException {
    return new this('Rating is a mandatory value');
  }
}
