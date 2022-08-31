import YourMovie from '@/domain/yourMovie/YourMovie';

interface YourMovieRepository {
  save(yourMovie: YourMovie): Promise<void>
}

export default YourMovieRepository;
