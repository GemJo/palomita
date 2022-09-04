import YourMovieRepresentation from '@/domain/yourMovie/YourMovieRepresentation';

export default class RawYourMovieRepresentation extends YourMovieRepresentation {
  toJson(): any {
    return {
      adult: this._movie.adult,
      cast: this._movie.cast,
      comment: this._personalInfo.getComment()?.toString() || null,
      created: this._createdDate.toISOString(),
      crew: this._movie.crew,
      genres: this._movie.genresKey.map((genre) => genre.toString()),
      homepage: this._movie.homepage,
      id: this._id.toString(),
      movieId: this._movie.id,
      lastUpdate: this._lastUpdateDate.toISOString(),
      originalTitle: this._movie.originalTitle,
      overview: this._movie.overview,
      posterPath: this._movie.posterPath,
      productionCompanies: this._movie.productionCompanies,
      rating: this._personalInfo.getRating()?.toNumber() || 0,
      releaseDate: this._movie.releaseDateISO,
      title: this._movie.title,
      viewed: this._personalInfo.getViewed(),
    };
  }
}
