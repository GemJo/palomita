import GetMovieQueryHandler from '@/application/movie/query/getMovie/GetMovieQueryHandler';
import MovieReadModelApi from '@/infrastructure/movie/MovieReadModelApi';
import ListPopularMovieQueryHandler
  from '@/application/movie/query/listPopularMovies/ListPopularMovieQueryHandler';
import SearchMovieQueryHandler from '@/application/movie/query/searchMovie/SearchMovieQueryHandler';

export default {};

export const retrieveMovieDetails = new GetMovieQueryHandler(
  new MovieReadModelApi(),
);

export const getPopularMovies = new ListPopularMovieQueryHandler(
  new MovieReadModelApi(),
);

export const searchMovie = new SearchMovieQueryHandler(
  new MovieReadModelApi(),
);
