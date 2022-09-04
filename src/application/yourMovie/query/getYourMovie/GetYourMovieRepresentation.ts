import YourMovieRepresentation from '@/domain/yourMovie/YourMovieRepresentation';

export default class GetYourMovieRepresentation extends YourMovieRepresentation {
  get id(): string {
    return this._id.toString();
  }

  get rating(): number {
    return this._personalInfo.getRating()?.toNumber() || 0;
  }

  get comment(): string {
    return this._personalInfo.getComment()?.toString() || '';
  }

  get viewed(): boolean {
    return this._personalInfo.getViewed();
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

  get homepage(): string | null {
    return this._movie.homepage;
  }

  get productionCompanies(): { id: number, name: string, country: string | null }[] {
    return this._movie.productionCompanies;
  }

  get cast(): { id: number, name: string, profilePath: string | null, character: string}[] {
    return this._movie.cast;
  }

  get adult(): boolean {
    return false;
  }

  get genres(): string[] {
    return this._movie.genres;
  }

  get originalTitle(): string {
    return this._movie.originalTitle;
  }

  get overview(): string {
    return this._movie.overview;
  }

  get crew(): { id: number, name: string, profilePath: string | null, job: string[]}[] {
    return this._movie.crew;
  }
}
