import MovieId from '@/domain/movie/MovieId';
import MovieTitle from '@/domain/movie/MovieTitle';
import MovieOriginalTitle from '@/domain/movie/MovieOriginalTitle';
import MovieSynopsis from '@/domain/movie/MovieSynopsis';
import MovieReleaseDate from '@/domain/movie/MovieReleaseDate';
import MovieRating from '@/domain/movie/MovieRating';
import MoviePosterPath from '@/domain/movie/MoviePosterPath';
import MovieHomePage from '@/domain/movie/MovieHomePage';
import MovieGenre from '@/domain/movie/MovieGenre';
import MovieCrewMember from '@/domain/movie/movieMember/movieCrewMember/MovieCrewMember';
import MovieCastMember from '@/domain/movie/movieMember/movieCastMember/MovieCastMember';
import Movie from '@/domain/movie/Movie';
import MovieMemberName from '@/domain/movie/movieMember/MovieMemberName';
import MovieMemberPicturePath from '@/domain/movie/movieMember/MovieMemberPicturePath';
import MovieCrewMemberJob from '@/domain/movie/movieMember/movieCrewMember/MovieCrewMemberJob';
import MovieCastMemberCharacter
  from '@/domain/movie/movieMember/movieCastMember/MovieCastMemberCharacter';
import MovieBuilderValidationException from '@/domain/movie/MovieBuilderValidationException';
import MovieProductionCompany from '@/domain/movie/productionCompany/MovieProductionCompany';
import MovieProductionCompanyId from '@/domain/movie/productionCompany/MovieProductionCompanyId';
import MovieProductionCompanyName
  from '@/domain/movie/productionCompany/MovieProductionCompanyName';
import MovieProductionCompanyCountry
  from '@/domain/movie/productionCompany/MovieProductionCompanyCountry';
import MovieMemberId from '@/domain/movie/movieMember/MovieMemberId';

export default class MovieBuilder {
  private id?: number | null = null;

  private title?: string | null = null;

  private originalTitle?: string | null = null;

  private synopsis?: string | null = null;

  private releaseDate?: string | null = null;

  private rating?: number | null = null;

  private posterPath?: string | null = null;

  private homePage?: string | null = null;

  private genres: any[] = [];

  private crewMembers: any[] = [];

  private castMembers: any[] = [];

  private productionCompanies: any[] = [];

  public widthId(id: number): MovieBuilder {
    this.id = id;

    return this;
  }

  public withDescription(
    title?: string,
    originalTitle?: string,
    synopsis?: string,
    releaseDate?: string,
    posterPath?: string,
    homePage?: string,
  ): MovieBuilder {
    this.title = title;
    this.originalTitle = originalTitle;
    this.synopsis = synopsis;
    this.releaseDate = releaseDate;
    this.posterPath = posterPath;
    this.homePage = homePage;

    return this;
  }

  withRating(rating: number): MovieBuilder {
    this.rating = rating;

    return this;
  }

  withGenres(genres: any[]): MovieBuilder {
    this.genres = genres;

    return this;
  }

  withMembers(crewMembers: any[], castMembers: any[]): MovieBuilder {
    this.crewMembers = crewMembers;
    this.castMembers = castMembers;

    return this;
  }

  withProductionCompanies(productionCompanies: any[]): MovieBuilder {
    this.productionCompanies = productionCompanies;
    return this;
  }

  public create(): Movie {
    this.mandatoryValuesExistOrFail();

    const movie: Movie = new Movie(
      MovieId.fromInt(this.id!),
      MovieTitle.fromString(this.title!),
      MovieOriginalTitle.fromString(this.originalTitle!),
    );

    if (this.rating) {
      movie.addRating(new MovieRating(this.rating!));
    }

    if (this.synopsis && this.synopsis !== '') {
      movie.addSynopsis(MovieSynopsis.fromString(this.synopsis));
    }

    if (this.releaseDate && this.releaseDate !== '') {
      movie.addReleaseDate(MovieReleaseDate.fromString(this.releaseDate));
    }

    if (this.posterPath && this.posterPath !== '') {
      movie.addPosterPath(MoviePosterPath.fromString(this.posterPath));
    }

    if (this.homePage && this.homePage !== '') {
      movie.addHomePage(MovieHomePage.fromString(this.homePage));
    }

    if (this.genres.length) {
      movie.addGenres(this.genres.map((genre) => {
        if (Number(genre)) {
          return MovieGenre.fromId(genre);
        }

        return MovieGenre.fromKey(genre);
      }));
    }

    if (this.crewMembers.length) {
      movie.addCrewMember(this.getCrewMember());
    }

    if (this.castMembers.length) {
      movie.addCastMember(this.getCastMember());
    }

    if (this.productionCompanies.length) {
      movie.addProductionCompanies(this.getProductionCompanies());
    }

    this.reset();

    return movie;
  }

  private mandatoryValuesExistOrFail(): void {
    if (!this.id || this.id <= 0) {
      throw MovieBuilderValidationException.fromMovieId();
    }

    if (!this.title || this.title === '') {
      throw MovieBuilderValidationException.fromTitle();
    }

    if (!this.originalTitle || this.originalTitle === '') {
      throw MovieBuilderValidationException.fromOriginalTitle();
    }
  }

  private getCrewMember(): MovieCrewMember[] {
    const crewMember: MovieCrewMember[] = [];
    this.crewMembers.forEach((crew: any) => {
      const member = new MovieCrewMember(
        MovieMemberId.fromInt(crew.id),
        MovieMemberName.fromString(crew.name),
        crew.job.map((job: string) => MovieCrewMemberJob.fromString(job)),
      );

      if (crew.profile_path) {
        member.addPicturePath(MovieMemberPicturePath.fromString(crew.profile_path));
      }

      if (crew.profilePath) {
        member.addPicturePath(MovieMemberPicturePath.fromString(crew.profilePath));
      }

      crewMember.push(member);
    });
    return crewMember;
  }

  private getCastMember(): MovieCastMember[] {
    const castMember: MovieCastMember[] = [];
    this.castMembers.forEach((cast) => {
      const member = new MovieCastMember(
        MovieMemberId.fromInt(cast.id),
        MovieMemberName.fromString(cast.name),
        MovieCastMemberCharacter.fromString(cast.character),
      );

      if (cast.profile_path) {
        member.addPicturePath(MovieMemberPicturePath.fromString(cast.profile_path));
      }

      if (cast.profilePath) {
        member.addPicturePath(MovieMemberPicturePath.fromString(cast.profilePath));
      }

      castMember.push(member);
    });
    return castMember;
  }

  private getProductionCompanies(): MovieProductionCompany[] {
    const companies: MovieProductionCompany[] = [];
    this.productionCompanies.forEach((company) => {
      const productionCompany = new MovieProductionCompany(
        MovieProductionCompanyId.fromInt(company.id),
        MovieProductionCompanyName.fromString(company.name),
      );

      if (company.origin_country) {
        productionCompany.addCountry(
          MovieProductionCompanyCountry.fromString(company.origin_country),
        );
      }

      companies.push(productionCompany);
    });

    return companies;
  }

  private reset(): void {
    this.id = null;
    this.title = null;
    this.originalTitle = null;
    this.synopsis = null;
    this.releaseDate = null;
    this.rating = null;
    this.posterPath = null;
    this.homePage = null;
    this.genres = [];
    this.crewMembers = [];
    this.castMembers = [];
    this.productionCompanies = [];
  }
}
