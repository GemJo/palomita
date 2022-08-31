import MovieReadModel from '@/domain/movie/MovieReadModel';
import GetMovieQuery from '@/application/movie/query/getMovie/GetMovieQuery';
import MovieId from '@/domain/movie/MovieId';
import Movie from '@/domain/movie/Movie';
import GetMovieRepresentation from '@/application/movie/query/getMovie/GetMovieRepresentation';

export default class GetMovieQueryHandler {
  private readModel: MovieReadModel;

  constructor(readModel: MovieReadModel) {
    this.readModel = readModel;
  }

  public async invoke(query: GetMovieQuery)
    : Promise<{ success: boolean, movie?: GetMovieRepresentation }> {
    try {
      const movie: Movie = await this.readModel.retrieve(MovieId.fromInt(query.movieId));
      return {
        success: true,
        movie: movie.representedAs(new GetMovieRepresentation()) as GetMovieRepresentation,
      };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}
