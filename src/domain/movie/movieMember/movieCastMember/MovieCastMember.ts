import MovieMember from '@/domain/movie/movieMember/MovieMember';
import MovieCastMemberCharacter
  from '@/domain/movie/movieMember/movieCastMember/MovieCastMemberCharacter';
import MovieMemberName from '@/domain/movie/movieMember/MovieMemberName';
import MovieMemberPicturePath from '@/domain/movie/movieMember/MovieMemberPicturePath';
import MovieMemberId from '@/domain/movie/movieMember/MovieMemberId';

export default class MovieCastMember extends MovieMember {
  private readonly character: MovieCastMemberCharacter;

  constructor(
    id: MovieMemberId,
    name: MovieMemberName,
    character: MovieCastMemberCharacter,
  ) {
    super(id, name);
    this.character = character;
  }

  public getValues(): {
    id: MovieMemberId
    name: MovieMemberName,
    picturePath?: MovieMemberPicturePath,
    character: MovieCastMemberCharacter,
    } {
    return {
      ...super.getValues(),
      character: this.character,
    };
  }
}
