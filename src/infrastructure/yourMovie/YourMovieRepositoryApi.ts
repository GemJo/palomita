import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import YourMovie from '@/domain/yourMovie/YourMovie';
import RawYourMovieRepresentation from '@/infrastructure/yourMovie/RawYourMovieRepresentation';
import RestActions from '@/infrastructure/restActions/RestActions';

export default class YourMovieRepositoryApi extends RestActions implements YourMovieRepository {
  public async save(yourMovie: YourMovie): Promise<void> {
    const yourMovieRawRepresentation = yourMovie
      .representedAs(new RawYourMovieRepresentation()) as RawYourMovieRepresentation;

    await this.post('/movie/save', yourMovieRawRepresentation.toJson());
  }
}
