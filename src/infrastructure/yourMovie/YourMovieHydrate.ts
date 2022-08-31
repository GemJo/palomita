import YourMovie from '@/domain/yourMovie/YourMovie';
import MovieBuilder from '@/domain/movie/MovieBuilder';
import PersonalInfo from '@/domain/yourMovie/personalInfo/PersonalInfo';
import PersonalInfoRating from '@/domain/yourMovie/personalInfo/PersonalInfoRating';
import PersonalInfoComment from '@/domain/yourMovie/personalInfo/PersonalInfoComment';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovieCreatedDate from '@/domain/yourMovie/YourMovieCreatedDate';
import YourMovieLastUpdateDate from '@/domain/yourMovie/YourMovieLastUpdateDate';

export default class YourMovieHydrate {
  public static invoke(yourMovieRaw: any): YourMovie {
    const yourMovie: YourMovie = Object.create(YourMovie.prototype);

    const movie = this.createMovie(yourMovieRaw);
    Reflect.set(yourMovie, 'movie', movie);

    Reflect.set(yourMovie, 'id', YourMovieId.fromString(yourMovieRaw.id));
    Reflect.set(yourMovie, 'createdDate', YourMovieCreatedDate.fromString(yourMovieRaw.created));
    Reflect.set(yourMovie, 'lastUpdateDate', YourMovieLastUpdateDate.fromString(yourMovieRaw.lastUpdate));

    const personalInfo = this.createPersonalInfo(yourMovieRaw);
    Reflect.set(yourMovie, 'personalInfo', personalInfo);

    return yourMovie;
  }

  private static createPersonalInfo(yourMovieRaw: any) {
    const personalInfo: PersonalInfo = new PersonalInfo();
    personalInfo.setViewed(yourMovieRaw.viewed);
    personalInfo.setRating(new PersonalInfoRating(yourMovieRaw.rating));

    if (yourMovieRaw.comment) {
      personalInfo.setComment(PersonalInfoComment.fromString(yourMovieRaw.comment));
    }
    return personalInfo;
  }

  private static createMovie(movieRaw: any) {
    const movieBuilder: MovieBuilder = new MovieBuilder();
    movieBuilder.widthId(movieRaw.movieId)
      .withDescription(
        movieRaw.title,
        movieRaw.originalTitle,
        movieRaw.overview,
        movieRaw.releaseDate,
        movieRaw.posterPath,
        movieRaw.homepage,
      )
      .withRating(movieRaw.rating)
      .withGenres(
        movieRaw.genres,
      )
      .withMembers(movieRaw.crew, movieRaw.cast)
      .withProductionCompanies(movieRaw.productionCompanies);

    return movieBuilder.create();
  }
}
