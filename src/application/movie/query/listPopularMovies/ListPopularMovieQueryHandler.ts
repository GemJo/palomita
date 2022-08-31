import MovieReadModel from '@/domain/movie/MovieReadModel';
import ListPopularMovieQuery
  from '@/application/movie/query/listPopularMovies/ListPopularMovieQuery';
import Movie from '@/domain/movie/Movie';
import ListMovieRepresentation
  from '@/application/movie/query/ListMovieRepresentation';

export default class ListPopularMovieQueryHandler {
  private readonly movieReadModel: MovieReadModel;

  constructor(movieReadModel: MovieReadModel) {
    this.movieReadModel = movieReadModel;
  }

  public async invoke(query: ListPopularMovieQuery)
    : Promise<{ success: boolean, movies?: ListMovieRepresentation[] }> {
    try {
      const movies: Movie[] = await this.movieReadModel.popular();
      const moviesRepresentation: ListMovieRepresentation[] = movies
        .map((movie) => movie.representedAs(
          new ListMovieRepresentation(),
        ) as ListMovieRepresentation);

      return {
        success: true,
        movies: moviesRepresentation
          .sort((movie1, movie2) => (movie1.voteAverage > movie2.voteAverage ? -1 : 1)),
      };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}
