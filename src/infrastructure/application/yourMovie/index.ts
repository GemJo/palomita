import CreateYourMovieCommandHandler
  from '@/application/yourMovie/command/createYourMovie/CreateYourMovieCommandHandler';
import MovieReadModelApi from '@/infrastructure/movie/MovieReadModelApi';
import YourMovieRepositoryApi from '@/infrastructure/yourMovie/YourMovieRepositoryApi';
import GetYourMovieQueryHandler
  from '@/application/yourMovie/query/getYourMovie/GetYourMovieQueryHandler';
import EditYourMovieCommandHandler
  from '@/application/yourMovie/command/editYourMovie/EditYourMovieCommandHandler';
import DeleteYourMovieCommandHandler
  from '@/application/yourMovie/command/deleteYourMovie/DeleteYourMovieCommandHandler';
import ListYourMovieQueryHandler
  from '@/application/yourMovie/query/ListYourMovie/ListYourMovieQueryHandler';

export default {};

export const createYourMovie = new CreateYourMovieCommandHandler(
  new MovieReadModelApi(),
  new YourMovieRepositoryApi(),
);

export const retrieveYourMovie = new GetYourMovieQueryHandler(
  new YourMovieRepositoryApi(),
);

export const editYourMovie = new EditYourMovieCommandHandler(
  new YourMovieRepositoryApi(),
);

export const deleteYourMovie = new DeleteYourMovieCommandHandler(
  new YourMovieRepositoryApi(),
);

export const fetchListYourMovies = new ListYourMovieQueryHandler(
  new YourMovieRepositoryApi(),
);
