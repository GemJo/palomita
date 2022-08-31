import MovieMember from '@/domain/movie/movieMember/MovieMember';
import MovieCrewMemberJob from '@/domain/movie/movieMember/movieCrewMember/MovieCrewMemberJob';
import MovieMemberName from '@/domain/movie/movieMember/MovieMemberName';
import MovieMemberPicturePath from '@/domain/movie/movieMember/MovieMemberPicturePath';
import MovieMemberId from '@/domain/movie/movieMember/MovieMemberId';

export default class MovieCrewMember extends MovieMember {
  private readonly jobs: MovieCrewMemberJob[] = [];

  constructor(
    id: MovieMemberId,
    name: MovieMemberName,
    jobs: MovieCrewMemberJob[],
  ) {
    super(id, name);
    this.jobs = jobs;
  }

  public getValues(): {
    id: MovieMemberId
    name: MovieMemberName,
    picturePath?: MovieMemberPicturePath,
    jobs: MovieCrewMemberJob[],
    } {
    return {
      ...super.getValues(),
      jobs: this.jobs,
    };
  }
}
