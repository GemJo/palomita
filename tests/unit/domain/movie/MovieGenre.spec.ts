import MovieGenre from '@/domain/movie/MovieGenre';
import MovieGenreValidationException from '@/domain/movie/MovieGenreValidationException';

const genreId = {
  provide: 878,
  expect: {
    id: 878,
    key: 'science_fiction',
    name: 'Ciencia ficción',
  },
};
const genreKey = {
  provide: 'horror',
  expect: {
    id: 27,
    key: 'horror',
    name: 'Terror',
  },
};

describe('Movie genres', () => {
  it('must fail with with wrong values', () => {
    expect(() => MovieGenre.fromId(13))
      .toThrow(MovieGenreValidationException);
    expect(() => MovieGenre.fromId(13))
      .toThrow('There is no genre with this id \'13\'');

    expect(() => MovieGenre.fromKey('wrong'))
      .toThrow(MovieGenreValidationException);
    expect(() => MovieGenre.fromKey('wrong'))
      .toThrow('There is no genre with this key \'wrong\'');
  });

  it('must create genre with correct values', () => {
    const genreOne = MovieGenre.fromId(genreId.provide);
    expect(genreOne).toBeInstanceOf(MovieGenre);
    expect(genreOne.toObject()).toEqual(genreId.expect);

    const genreTwo = MovieGenre.fromKey(genreKey.provide);
    expect(genreTwo).toBeInstanceOf(MovieGenre);
    expect(genreTwo.toObject()).toEqual(genreKey.expect);
  });
});
