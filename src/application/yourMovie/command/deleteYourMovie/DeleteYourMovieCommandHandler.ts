import YourMovieRepository from '@/domain/yourMovie/YourMovieRepository';
import DeleteYourMovieCommand
  from '@/application/yourMovie/command/deleteYourMovie/DeleteYourMovieCommand';
import YourMovieId from '@/domain/yourMovie/YourMovieId';

export default class DeleteYourMovieCommandHandler {
  private readonly yourMovieRepository: YourMovieRepository;

  constructor(yourMovieRepository: YourMovieRepository) {
    this.yourMovieRepository = yourMovieRepository;
  }

  public async invoke(command: DeleteYourMovieCommand): Promise<{ success: boolean }> {
    try {
      await this.yourMovieRepository.remove(YourMovieId.fromString(command.yourMovieId));
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}
