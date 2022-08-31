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
import MovieProductionCompany from '@/domain/movie/productionCompany/MovieProductionCompany';

export default abstract class MovieRepresentation {
  protected _id!: MovieId;

  protected _title!: MovieTitle;

  protected _originalTitle!: MovieOriginalTitle

  protected _synopsis?: MovieSynopsis;

  protected _releaseDate?: MovieReleaseDate;

  protected _rating?: MovieRating;

  protected _posterPath?: MoviePosterPath;

  protected _homePage?: MovieHomePage;

  protected _genres!: MovieGenre[];

  protected _crewMembers!: MovieCrewMember[];

  protected _castMembers!: MovieCastMember[];

  protected _productionCompanies!: MovieProductionCompany[];

  public setId(id: MovieId): this {
    this._id = id;
    return this;
  }

  public setTitle(title: MovieTitle): this {
    this._title = title;
    return this;
  }

  public setOriginalTitle(originalTitle: MovieOriginalTitle): this {
    this._originalTitle = originalTitle;
    return this;
  }

  public setSynopsis(synopsis?: MovieSynopsis): this {
    this._synopsis = synopsis;
    return this;
  }

  public setReleaseDate(releaseDate?: MovieReleaseDate): this {
    this._releaseDate = releaseDate;
    return this;
  }

  public setRating(rating?: MovieRating): this {
    this._rating = rating;
    return this;
  }

  public setPosterPath(posterPath?: MoviePosterPath): this {
    this._posterPath = posterPath;
    return this;
  }

  public setHomePage(homePage?: MovieHomePage): this {
    this._homePage = homePage;
    return this;
  }

  public setGenres(genres: MovieGenre[]): this {
    this._genres = genres;
    return this;
  }

  public setCrewMembers(crewMembers: MovieCrewMember[]): this {
    this._crewMembers = crewMembers;
    return this;
  }

  public setCastMembers(castMembers: MovieCastMember[]): this {
    this._castMembers = castMembers;
    return this;
  }

  public setProductionCompanies(productionCompanies: MovieProductionCompany[]): this {
    this._productionCompanies = productionCompanies;
    return this;
  }
}
