import MovieRating from '@/domain/movie/MovieRating';
import MovieRatingValidationException from '@/domain/movie/MovieRatingValidationException';

const ratingProvider = [2.2, 5, 0.75];

const wrongRatingProvider = [
  { provider: 58.5, errorExpect: 'Rating \'58.5\' is above than 10' },
  { provider: 10.1, errorExpect: 'Rating \'10.1\' is above than 10' },
  { provider: -1.25, errorExpect: 'Rating \'-1.25\' is below than 0' },
];

describe('Movie rating', () => {
  it.each(wrongRatingProvider)('must fail with incorrect values', (value) => {
    expect(() => new MovieRating(value.provider)).toThrow(MovieRatingValidationException);
    expect(() => new MovieRating(value.provider)).toThrow(value.errorExpect);
  });

  it.each(ratingProvider)('must create movie rating with correct values', (value) => {
    const rating = new MovieRating(value);
    expect(rating).toBeInstanceOf(MovieRating);
    expect(rating.toString()).toEqual(String(value));
    expect(rating.toNumber()).toEqual(value);
  });
});
