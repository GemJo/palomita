import MovieRepresentation from '@/domain/movie/MovieRepresentation';

export default class GetMovieRepresentation extends MovieRepresentation {
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

  get releaseDateISO(): string {
    return this._releaseDate?.toISOString() || '';
  }

  get homepage(): string | null {
    return this._homePage?.toString() || null;
  }

  get productionCompanies(): { id: number, name: string, country: string | null }[] {
    return this._productionCompanies.map((company) => company.toObject());
  }

  get cast(): { id: number, name: string, profilePath: string | null, character: string}[] {
    return this._castMembers.map((cast) => {
      const member = cast.getValues();
      return {
        id: member.id.toInt(),
        profilePath: member.picturePath?.toString() || '',
        name: member.name.toString(),
        character: member.character.toString(),
      };
    });
  }

  get voteAverage(): number {
    if (!this._rating) {
      return 0;
    }

    return (this._rating.toNumber() * 5) / 10;
  }

  get adult(): boolean {
    return false;
  }

  get genres(): string[] {
    return this._genres.map((genre) => genre.getName().toString());
  }

  get genresKey(): string[] {
    return this._genres.map((genre) => genre.getKey());
  }

  get originalTitle(): string {
    return this._originalTitle.toString();
  }

  get overview(): string {
    return this._synopsis?.toString() || '';
  }

  get crew(): { id: number, name: string, profilePath: string | null, job: string[]}[] {
    return this._crewMembers.map((crew) => {
      const member = crew.getValues();
      return {
        id: member.id.toInt(),
        profilePath: member.picturePath?.toString() || '',
        name: member.name.toString(),
        job: member.jobs.map((job) => job.toString()),
      };
    });
  }
}
