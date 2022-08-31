import MovieTitle from '@/domain/movie/MovieTitle';
import MovieOriginalTitle from '@/domain/movie/MovieOriginalTitle';
import MovieSynopsis from '@/domain/movie/MovieSynopsis';
import MovieReleaseDate from '@/domain/movie/MovieReleaseDate';
import MoviePosterPath from '@/domain/movie/MoviePosterPath';
import MovieHomePage from '@/domain/movie/MovieHomePage';
import MovieGenre from '@/domain/movie/MovieGenre';
import MovieCrewMember from '@/domain/movie/movieMember/movieCrewMember/MovieCrewMember';
import MovieCastMember from '@/domain/movie/movieMember/movieCastMember/MovieCastMember';
import MovieId from '@/domain/movie/MovieId';
import MovieRating from '@/domain/movie/MovieRating';
import MovieRepresentation from '@/domain/movie/MovieRepresentation';
import MovieProductionCompany from '@/domain/movie/productionCompany/MovieProductionCompany';

export default class Movie {
  private readonly id: MovieId;

  private readonly title: MovieTitle;

  private readonly originalTitle: MovieOriginalTitle;

  private synopsis?: MovieSynopsis;

  private releaseDate?: MovieReleaseDate;

  private rating?: MovieRating;

  private posterPath?: MoviePosterPath;

  private homePage?: MovieHomePage;

  private genres: MovieGenre[] = [];

  private crewMembers: MovieCrewMember[] = [];

  private castMembers: MovieCastMember[] = [];

  private productionCompanies: MovieProductionCompany[] = [];

  constructor(
    id: MovieId,
    title: MovieTitle,
    originalTitle: MovieOriginalTitle,
  ) {
    this.id = id;
    this.title = title;
    this.originalTitle = originalTitle;
  }

  public addRating(rating: MovieRating): void {
    this.rating = rating;
  }

  public addSynopsis(synopsis: MovieSynopsis): void{
    this.synopsis = synopsis;
  }

  public addReleaseDate(releaseDate: MovieReleaseDate): void{
    this.releaseDate = releaseDate;
  }

  public addPosterPath(posterPath: MoviePosterPath): void{
    this.posterPath = posterPath;
  }

  public addHomePage(homePage: MovieHomePage): void{
    this.homePage = homePage;
  }

  public addGenres(genres: MovieGenre[]): void {
    this.genres = genres;
  }

  public addCrewMember(crewMember: MovieCrewMember[]): void {
    this.crewMembers = crewMember;
  }

  public addCastMember(castMember: MovieCastMember[]): void {
    this.castMembers = castMember;
  }

  public addProductionCompanies(productionCompanies: MovieProductionCompany[]): void {
    this.productionCompanies = productionCompanies;
  }

  public representedAs(movieRepresentation: MovieRepresentation): MovieRepresentation {
    return movieRepresentation.setId(this.id)
      .setTitle(this.title)
      .setOriginalTitle(this.originalTitle)
      .setSynopsis(this.synopsis)
      .setReleaseDate(this.releaseDate)
      .setRating(this.rating)
      .setPosterPath(this.posterPath)
      .setHomePage(this.homePage)
      .setGenres(this.genres)
      .setCrewMembers(this.crewMembers)
      .setCastMembers(this.castMembers)
      .setProductionCompanies(this.productionCompanies);
  }
}
