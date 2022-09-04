import MovieReadModel from '@/domain/movie/MovieReadModel';
import SearchMovieQuery from '@/application/movie/query/searchMovie/SearchMovieQuery';
import Movie from '@/domain/movie/Movie';
import ListMovieRepresentation from '@/application/movie/query/ListMovieRepresentation';

export default class SearchMovieQueryHandler {
  private readonly movieReadModel: MovieReadModel;

  constructor(movieReadModel: MovieReadModel) {
    this.movieReadModel = movieReadModel;
  }

  public async invoke(query: SearchMovieQuery)
    : Promise<{ success: boolean, movies?: ListMovieRepresentation[] }> {
    try {
      const movies: Movie[] = await this.movieReadModel.search(query.search);

      return {
        success: true,
        movies: movies.map((movie) => movie
          .representedAs(new ListMovieRepresentation()) as ListMovieRepresentation),
      };
    } catch (e) {
      return { success: false };
    }
  }
}
