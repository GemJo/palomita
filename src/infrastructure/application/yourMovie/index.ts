import CreateYourMovieCommandHandler
  from '@/application/yourMovie/command/createYourMovie/CreateYourMovieCommandHandler';
import MovieReadModelApi from '@/infrastructure/movie/MovieReadModelApi';
import YourMovieRepositoryApi from '@/infrastructure/yourMovie/YourMovieRepositoryApi';

export default {};

export const createYourMovie = new CreateYourMovieCommandHandler(
  new MovieReadModelApi(),
  new YourMovieRepositoryApi(),
);
