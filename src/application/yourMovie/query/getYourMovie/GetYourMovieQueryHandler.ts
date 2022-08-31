import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import YourMovie from '@/domain/yourMovie/YourMovie';
import GetYourMovieQuery from '@/application/yourMovie/query/getYourMovie/GetYourMovieQuery';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import GetYourMovieRepresentation
  from '@/application/yourMovie/query/getYourMovie/GetYourMovieRepresentation';

export default class GetYourMovieQueryHandler {
  private readonly yourMovieRepository: YourMovieRepository;

  constructor(yourMovieRepository: YourMovieRepository) {
    this.yourMovieRepository = yourMovieRepository;
  }

  public async invoke(query: GetYourMovieQuery): Promise<{ success: boolean, yourMovie?: any}> {
    try {
      const yourMovie: YourMovie = await this.yourMovieRepository
        .retrieve(YourMovieId.fromString(query.yourMovieId));

      return {
        success: true,
        yourMovie: yourMovie.representedAs(new GetYourMovieRepresentation()),
      };
    } catch (e) {
      console.error(e);
      return { success: false };
    }
  }
}
