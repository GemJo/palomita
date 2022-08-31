import MovieId from '@/domain/movie/MovieId';
import Movie from '@/domain/movie/Movie';

interface MovieReadModel {
  retrieve(id: MovieId): Promise<Movie>;
}

export default MovieReadModel;
