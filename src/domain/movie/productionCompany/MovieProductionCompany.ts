import MovieProductionCompanyId from '@/domain/movie/productionCompany/MovieProductionCompanyId';
import MovieProductionCompanyName
  from '@/domain/movie/productionCompany/MovieProductionCompanyName';
import MovieProductionCompanyCountry
  from '@/domain/movie/productionCompany/MovieProductionCompanyCountry';

export default class MovieProductionCompany {
  private readonly id: MovieProductionCompanyId;

  private readonly name: MovieProductionCompanyName;

  private country: MovieProductionCompanyCountry | null = null;

  constructor(id: MovieProductionCompanyId, name: MovieProductionCompanyName) {
    this.id = id;
    this.name = name;
  }

  addCountry(country: MovieProductionCompanyCountry): void {
    this.country = country;
  }

  public toObject(): { id: number, name: string, country: string | null } {
    return {
      id: this.id.toInt(),
      name: this.name.toString(),
      country: this.country?.toString() || null,
    };
  }
}
