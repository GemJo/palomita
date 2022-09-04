import MovieGenre from '@/domain/movie/MovieGenre';

const genres = [
  {
    id: 10752,
    key: 'war',
    name: 'Bélica',
  },
  {
    id: 9648,
    key: 'mystery',
    name: 'Misterio',
  },
  {
    id: 37,
    key: 'western',
    name: 'Western',
  },
  {
    id: 18,
    key: 'drama',
    name: 'Drama',
  },
];

export default class MovieGenreMother {
  public static random(): MovieGenre {
    const index = Math.floor(Math.random() * genres.length);
    return MovieGenre.fromId(genres[index].id);
  }
}
