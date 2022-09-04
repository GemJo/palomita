import MovieGenreValidationException from '@/domain/movie/MovieGenreValidationException';

const VALID_GENRES = [
  {
    id: 12,
    key: 'adventure',
    name: 'Aventura',
  },
  {
    id: 14,
    key: 'fantasy',
    name: 'Fantasía',
  },
  {
    id: 16,
    key: 'animation',
    name: 'Animación',
  },
  {
    id: 18,
    key: 'drama',
    name: 'Drama',
  },
  {
    id: 27,
    key: 'horror',
    name: 'Terror',
  },
  {
    id: 28,
    key: 'action',
    name: 'Acción',
  },
  {
    id: 35,
    key: 'comedy',
    name: 'Comedia',
  },
  {
    id: 36,
    key: 'history',
    name: 'Historia',
  },
  {
    id: 37,
    key: 'western',
    name: 'Western',
  },
  {
    id: 53,
    key: 'thriller',
    name: 'Suspense',
  },
  {
    id: 80,
    key: 'crime',
    name: 'Crimen',
  },
  {
    id: 99,
    key: 'documentary',
    name: 'Documental',
  },
  {
    id: 878,
    key: 'science_fiction',
    name: 'Ciencia ficción',
  },
  {
    id: 9648,
    key: 'mystery',
    name: 'Misterio',
  },
  {
    id: 10402,
    key: 'music',
    name: 'Música',
  },
  {
    id: 10749,
    key: 'romance',
    name: 'Romance',
  },
  {
    id: 10751,
    key: 'family',
    name: 'Familia',
  },
  {
    id: 10752,
    key: 'war',
    name: 'Bélica',
  },
  {
    id: 10770,
    key: 'tv_movie',
    name: 'Película de TV',
  },
];

export default class MovieGenre {
  private readonly id: number;

  private readonly key: string;

  private readonly name: string;

  private constructor(id: number, key: string, name: string) {
    this.id = id;
    this.key = key;
    this.name = name;
  }

  public static fromKey(key: string): MovieGenre {
    const genre = this.getGenreByKey(key);
    return new this(genre.id, genre.key, genre.name);
  }

  private static getGenreByKey(key: string): { id: number, key: string, name: string } {
    const genreFound = VALID_GENRES.find((genre) => genre.key === key);
    if (!genreFound) {
      throw MovieGenreValidationException.fromKey(key);
    }

    return genreFound;
  }

  public static fromId(id: number): MovieGenre {
    const genre = this.getGenreById(id);
    return new this(genre.id, genre.key, genre.name);
  }

  private static getGenreById(id: number): { id: number, key: string, name: string } {
    const genreFound = VALID_GENRES.find((genre) => genre.id === id);
    if (!genreFound) {
      throw MovieGenreValidationException.fromId(id);
    }

    return genreFound;
  }

  public getName(): string {
    return this.name;
  }

  public getKey(): string {
    return this.key;
  }

  public getId(): number {
    return this.id;
  }

  public toObject(): { id: number, key: string, name: string } {
    return {
      id: this.id,
      key: this.key,
      name: this.name,
    };
  }
}
