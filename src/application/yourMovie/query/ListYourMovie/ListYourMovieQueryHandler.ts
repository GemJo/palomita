import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import YourMovie from '@/domain/yourMovie/YourMovie';
import ListYourMovieQuery from '@/application/yourMovie/query/ListYourMovie/ListYourMovieQuery';
import ListYourMovieRepresentation
  from '@/application/yourMovie/query/ListYourMovie/ListYourMovieRepresentation';

export default class ListYourMovieQueryHandler {
  private readonly yourMovieRepository: YourMovieRepository;

  constructor(yourMovieRepository: YourMovieRepository) {
    this.yourMovieRepository = yourMovieRepository;
  }

  public async invoke(query: ListYourMovieQuery): Promise<{ success: boolean, movies?: any[] }> {
    try {
      const listMovies: YourMovie[] = await this.yourMovieRepository.all();

      return {
        success: true,
        movies: listMovies.map((movie) => movie
          .representedAs(new ListYourMovieRepresentation()) as ListYourMovieRepresentation),
      };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}
