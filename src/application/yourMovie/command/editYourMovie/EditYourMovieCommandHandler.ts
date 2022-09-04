import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import EditYourMovieCommand
  from '@/application/yourMovie/command/editYourMovie/EditYourMovieCommand';
import YourMovieId from '@/domain/yourMovie/YourMovieId';
import YourMovie from '@/domain/yourMovie/YourMovie';
import YourMovieToUpdate from '@/domain/yourMovie/YourMovieToUpdate';
import PersonalInfo from '@/domain/yourMovie/personalInfo/PersonalInfo';
import PersonalInfoRating from '@/domain/yourMovie/personalInfo/PersonalInfoRating';
import PersonalInfoComment from '@/domain/yourMovie/personalInfo/PersonalInfoComment';

export default class EditYourMovieCommandHandler {
  private readonly yourMovieRepository: YourMovieRepository;

  constructor(yourMovieRepository: YourMovieRepository) {
    this.yourMovieRepository = yourMovieRepository;
  }

  public async invoke(command: EditYourMovieCommand): Promise<{ success: boolean, error?: any }> {
    try {
      const movie: YourMovie = await this.yourMovieRepository
        .retrieve(YourMovieId.fromString(command.movieId));

      const personalInfo = new PersonalInfo();
      personalInfo.setViewed(command.viewed);
      personalInfo.setRating(new PersonalInfoRating(command.rating));
      if (command.comment.trim() !== '') {
        personalInfo.setComment(PersonalInfoComment.fromString(command.comment));
      }

      const yourMovieToUpdate = new YourMovieToUpdate();
      yourMovieToUpdate.setPersonalInfo(personalInfo);

      movie.update(yourMovieToUpdate);

      await this.yourMovieRepository.update(movie);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, error: e.response };
    }
  }
}
