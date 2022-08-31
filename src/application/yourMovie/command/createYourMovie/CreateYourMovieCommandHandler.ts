import MovieReadModel from '@/domain/movie/MovieReadModel';
import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import Movie from '@/domain/movie/Movie';
import MovieId from '@/domain/movie/MovieId';
import CreateYourMovieCommand from '@/application/yourMovie/command/createYourMovie/CreateYourMovieCommand';
import YourMovie from '@/domain/yourMovie/YourMovie';
import PersonalInfoRating from '@/domain/yourMovie/personalInfo/PersonalInfoRating';
import PersonalInfoComment from '@/domain/yourMovie/personalInfo/PersonalInfoComment';

export default class CreateYourMovieCommandHandler {
  private readonly movieReadModel: MovieReadModel;

  private readonly yourMovieRepository: YourMovieRepository;

  constructor(movieReadModel: MovieReadModel, yourMovieRepository: YourMovieRepository) {
    this.movieReadModel = movieReadModel;
    this.yourMovieRepository = yourMovieRepository;
  }

  public async invoke(command: CreateYourMovieCommand): Promise<{ success: boolean, error?: any }> {
    try {
      const movie: Movie = await this.movieReadModel.retrieve(MovieId.fromInt(command.movieId));

      const yourMovie = this.createYourMovie(movie, command);

      await this.yourMovieRepository.save(yourMovie);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.response };
    }
  }

  private createYourMovie(movie: Movie, command: CreateYourMovieCommand) {
    const yourMovie = new YourMovie(movie);
    yourMovie.addRating(new PersonalInfoRating(command.rating));
    yourMovie.addViewed(command.viewed);

    if (command.comment.trim() !== '') {
      yourMovie.addComment(PersonalInfoComment.fromString(command.comment));
    }

    return yourMovie;
  }
}
