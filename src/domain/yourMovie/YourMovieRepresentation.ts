import Movie from '@/domain/movie/Movie';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovieCreatedDate from '@/domain/yourMovie/YourMovieCreatedDate';
import YourMovieLastUpdateDate from '@/domain/yourMovie/YourMovieLastUpdateDate';
import PersonalInfo from '@/domain/yourMovie/personalInfo/PersonalInfo';
import GetMovieRepresentation from '@/application/movie/query/getMovie/GetMovieRepresentation';

export default abstract class YourMovieRepresentation {
  protected _movie!: GetMovieRepresentation;

  protected _id!: YourMovieId;

  protected _createdDate!: YourMovieCreatedDate;

  protected _lastUpdateDate!: YourMovieLastUpdateDate;

  protected _personalInfo!: PersonalInfo;

  public setMovie(movie: Movie): YourMovieRepresentation {
    this._movie = movie.representedAs(new GetMovieRepresentation()) as GetMovieRepresentation;
    return this;
  }

  public setId(id: YourMovieId): YourMovieRepresentation {
    this._id = id;
    return this;
  }

  public setCreatedDate(createdDate: YourMovieCreatedDate): YourMovieRepresentation {
    this._createdDate = createdDate;
    return this;
  }

  public setLastUpdateDate(lastUpdateDate: YourMovieLastUpdateDate): YourMovieRepresentation {
    this._lastUpdateDate = lastUpdateDate;
    return this;
  }

  public setPersonalInfo(personalInfo: PersonalInfo): YourMovieRepresentation {
    this._personalInfo = personalInfo;
    return this;
  }
}
