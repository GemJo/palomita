export default class CreateYourMovieCommand {
  public movieId: number;

  public rating: number;

  public viewed: boolean;

  public comment: string;

  constructor(movieId: number, rating: number, viewed: boolean, comment: string) {
    this.movieId = movieId;
    this.rating = rating;
    this.viewed = viewed;
    this.comment = comment;
  }
}
