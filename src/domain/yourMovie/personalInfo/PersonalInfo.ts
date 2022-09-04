import PersonalInfoComment from '@/domain/yourMovie/personalInfo/PersonalInfoComment';
import PersonalInfoRating from '@/domain/yourMovie/personalInfo/PersonalInfoRating';

export default class PersonalInfo {
  private comment: PersonalInfoComment | null = null;

  private rating: PersonalInfoRating | null = null;

  private viewed = false;

  public setComment(comment: PersonalInfoComment): void {
    this.comment = comment;
  }

  public getComment(): PersonalInfoComment | null {
    return this.comment;
  }

  public setRating(rating: PersonalInfoRating): void {
    this.rating = rating;
  }

  public getRating(): PersonalInfoRating | null {
    return this.rating;
  }

  public setViewed(viewed: boolean): void {
    this.viewed = viewed;
  }

  public getViewed(): boolean {
    return this.viewed;
  }
}
