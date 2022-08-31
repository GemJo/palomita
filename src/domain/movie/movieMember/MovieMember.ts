import MovieMemberName from '@/domain/movie/movieMember/MovieMemberName';
import MovieMemberPicturePath from '@/domain/movie/movieMember/MovieMemberPicturePath';
import MovieMemberId from '@/domain/movie/movieMember/MovieMemberId';

export default abstract class MovieMember {
  private readonly id: MovieMemberId;

  private readonly name: MovieMemberName;

  private picturePath?: MovieMemberPicturePath;

  protected constructor(id: MovieMemberId, name: MovieMemberName) {
    this.id = id;
    this.name = name;
  }

  public addPicturePath(picturePath: MovieMemberPicturePath): void {
    this.picturePath = picturePath;
  }

  public getValues(): {
    id: MovieMemberId
    name: MovieMemberName,
    picturePath?: MovieMemberPicturePath,
    } {
    return {
      id: this.id,
      name: this.name,
      picturePath: this.picturePath,
    };
  }
}
