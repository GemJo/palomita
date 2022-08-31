export default class EditYourMovieCommand {
  public movieId: string;

  public rating: number;

  public viewed: boolean;

  public comment: string;

  constructor(movieId: string, rating: number, viewed: boolean, comment: string) {
    this.movieId = movieId;
    this.rating = rating;
    this.viewed = viewed;
    this.comment = comment;
  }
}
