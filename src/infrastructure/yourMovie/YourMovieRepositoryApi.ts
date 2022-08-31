import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import YourMovie from '@/domain/yourMovie/YourMovie';
import RawYourMovieRepresentation from '@/infrastructure/yourMovie/RawYourMovieRepresentation';
import RestActions from '@/infrastructure/restActions/RestActions';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovieHydrate from '@/infrastructure/yourMovie/YourMovieHydrate';

export default class YourMovieRepositoryApi extends RestActions implements YourMovieRepository {
  public async save(yourMovie: YourMovie): Promise<void> {
    const yourMovieRawRepresentation = yourMovie
      .representedAs(new RawYourMovieRepresentation()) as RawYourMovieRepresentation;

    await this.post('/movie/save', yourMovieRawRepresentation.toJson());
  }

  public async retrieve(yourMovieId: YourMovieId): Promise<YourMovie> {
    const yourMovieRaw: any = await this.get(`/movie/${yourMovieId.toString()}`, {});
    return YourMovieHydrate.invoke(yourMovieRaw);
  }

  public async update(yourMovie: YourMovie): Promise<void> {
    const yourMovieRawRepresentation = yourMovie
      .representedAs(new RawYourMovieRepresentation()) as RawYourMovieRepresentation;

    await this.put(
      `/movie/${yourMovie.getId().toString()}`,
      yourMovieRawRepresentation.toJson(),
    );
  }
}
