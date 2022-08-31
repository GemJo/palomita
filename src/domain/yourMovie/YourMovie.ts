import Movie from '@/domain/movie/Movie';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovieCreatedDate from '@/domain/yourMovie/YourMovieCreatedDate';
import YourMovieLastUpdateDate from '@/domain/yourMovie/YourMovieLastUpdateDate';

export default class YourMovie {
  private movie: Movie;

  private readonly id: YourMovieId;

  private readonly createdDate: YourMovieCreatedDate;

  private lastUpdateDate: YourMovieLastUpdateDate;

  constructor(movie: Movie) {
    this.movie = movie;
    this.id = YourMovieId.generate();
    this.createdDate = YourMovieCreatedDate.generate();
    this.lastUpdateDate = YourMovieLastUpdateDate.generate();
  }

  public getId(): YourMovieId {
    return this.id;
  }
}
