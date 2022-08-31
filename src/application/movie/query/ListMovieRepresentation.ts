import MovieRepresentation from '@/domain/movie/MovieRepresentation';

export default class ListMovieRepresentation extends MovieRepresentation {
  get id(): number {
    return this._id.toInt();
  }

  get posterPath(): string {
    return this._posterPath?.toString() || '';
  }

  get title(): string {
    return this._title.toString();
  }

  get releaseDate(): string {
    return this._releaseDate?.toDateString() || '';
  }

  get voteAverage(): number {
    if (!this._rating) {
      return 0;
    }

    return (this._rating?.toNumber() * 5) / 10;
  }

  get genreIds(): string[] {
    return this._genres.map((genre) => genre.getName());
  }

  get overview(): string {
    return this._synopsis?.toString() || '';
  }

  get adult(): boolean {
    return false;
  }
}
