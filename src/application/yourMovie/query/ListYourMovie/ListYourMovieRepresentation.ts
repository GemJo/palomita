import YourMovieRepresentation from '@/domain/yourMovie/YourMovieRepresentation';

export default class ListYourMovieRepresentation extends YourMovieRepresentation {
  get id(): string {
    return this._id.toString();
  }

  get posterPath(): string {
    return this._movie.posterPath;
  }

  get title(): string {
    return this._movie.title;
  }

  get releaseDate(): string {
    return this._movie.releaseDate;
  }

  get lastUpdate(): string {
    return this._lastUpdateDate.toDateString();
  }

  get rating(): number {
    return this._personalInfo.getRating()?.toNumber() || 0;
  }

  get genres(): string[] {
    return this._movie.genres;
  }

  get overview(): string {
    return this._movie.overview;
  }

  get adult(): boolean {
    return false;
  }
}
