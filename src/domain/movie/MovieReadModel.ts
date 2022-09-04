import MovieId from '@/domain/movie/MovieId';
import Movie from '@/domain/movie/Movie';

interface MovieReadModel {
  retrieve(id: MovieId): Promise<Movie>;
  popular(): Promise<Movie[]>;
  search(search: string): Promise<Movie[]>;
}

export default MovieReadModel;
