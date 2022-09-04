import YourMovie from '@/domain/yourMovie/YourMovie';
import YourMovieId from '@/domain/yourMovie/YourMovieId';

interface YourMovieRepository {
  save(yourMovie: YourMovie): Promise<void>
  retrieve(yourMovieId: YourMovieId): Promise<YourMovie>
  update(yourMovie: YourMovie): Promise<void>
  remove(yourMovieId: YourMovieId): Promise<void>;
  all(): Promise<YourMovie[]>;
}

export default YourMovieRepository;
