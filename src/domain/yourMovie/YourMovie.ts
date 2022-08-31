import Movie from '@/domain/movie/Movie';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovieCreatedDate from '@/domain/yourMovie/YourMovieCreatedDate';
import YourMovieLastUpdateDate from '@/domain/yourMovie/YourMovieLastUpdateDate';
import PersonalInfoComment from '@/domain/yourMovie/personalInfo/PersonalInfoComment';
import PersonalInfo from '@/domain/yourMovie/personalInfo/PersonalInfo';
import PersonalInfoRating from '@/domain/yourMovie/personalInfo/PersonalInfoRating';

export default class YourMovie {
  private movie: Movie;

  private readonly id: YourMovieId;

  private readonly createdDate: YourMovieCreatedDate;

  private lastUpdateDate: YourMovieLastUpdateDate;

  private personalInfo: PersonalInfo;

  constructor(movie: Movie) {
    this.movie = movie;
    this.id = YourMovieId.generate();
    this.createdDate = YourMovieCreatedDate.generate();
    this.lastUpdateDate = YourMovieLastUpdateDate.generate();
    this.personalInfo = new PersonalInfo();
  }

  public getId(): YourMovieId {
    return this.id;
  }

  public addComment(comment: PersonalInfoComment): void {
    this.personalInfo.setComment(comment);
  }

  public comment(): PersonalInfoComment | null {
    return this.personalInfo.getComment();
  }

  public addRating(rating: PersonalInfoRating): void {
    this.personalInfo.setRating(rating);
  }

  public rating(): PersonalInfoRating | null {
    return this.personalInfo.getRating();
  }

  public addViewed(viewed: boolean): void {
    this.personalInfo.setViewed(viewed);
  }

  public viewed(): boolean {
    return this.personalInfo.getViewed();
  }
}
