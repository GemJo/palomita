import GetMovieQueryHandler from '@/application/movie/query/getMovie/GetMovieQueryHandler';
import MovieReadModelApi from '@/infrastructure/movie/MovieReadModelApi';

export default {};

export const retrieveMovieDetails = new GetMovieQueryHandler(
  new MovieReadModelApi(),
);
