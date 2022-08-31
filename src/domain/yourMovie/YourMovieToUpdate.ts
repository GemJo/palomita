import YourMovieRepresentation from '@/domain/yourMovie/YourMovieRepresentation';
import PersonalInfo from '@/domain/yourMovie/personalInfo/PersonalInfo';

export default class YourMovieToUpdate extends YourMovieRepresentation {
  get personalInfo(): PersonalInfo {
    return this._personalInfo;
  }
}
