import YourMovie from '@/domain/yourMovie/YourMovie';
import YourMovieId from '@/domain/yourMovie/YourMovieId';

interface YourMovieRepository {
  save(yourMovie: YourMovie): Promise<void>
  retrieve(yourMovieId: YourMovieId): Promise<YourMovie>
}

export default YourMovieRepository;
