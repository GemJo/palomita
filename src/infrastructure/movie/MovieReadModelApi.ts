import RestActions from '@/infrastructure/restActions/RestActions';
import MovieReadModel from '@/domain/movie/MovieReadModel';
import MovieId from '@/domain/movie/MovieId';
import Movie from '@/domain/movie/Movie';
import MovieBuilder from '@/domain/movie/MovieBuilder';

export default class MovieReadModelApi extends RestActions implements MovieReadModel {
  public async retrieve(id: MovieId): Promise<Movie> {
    const movieRaw: any = await this.get(
      `/movieDB/movie?id=${id.toString()}`,
      {},
    );

    const crewMembersGroupedById = this.getMembersCrewGroupById(movieRaw.crew);
    const movieBuilder: MovieBuilder = new MovieBuilder();
    movieBuilder.widthId(movieRaw.id)
      .withDescription(
        movieRaw.title,
        movieRaw.original_title,
        movieRaw.overview,
        movieRaw.release_date,
        movieRaw.poster_path,
        movieRaw.homepage,
      )
      .withRating(movieRaw.vote_average)
      .withGenres(movieRaw.genres.map((genre: any) => genre.id))
      .withMembers(Object.values(crewMembersGroupedById), movieRaw.cast)
      .withProductionCompanies(movieRaw.production_companies);

    return movieBuilder.create();
  }

  private getMembersCrewGroupById(crewMembers: any[]): any {
    const crewMembersGroupedById: any = {};
    crewMembers.forEach((crew) => {
      if (crewMembersGroupedById[crew.id]) {
        crewMembersGroupedById[crew.id].job.push(crew.job);
        return;
      }

      crewMembersGroupedById[crew.id] = crew;
      crewMembersGroupedById[crew.id].job = [crew.job];
    });
    return crewMembersGroupedById;
  }
}
