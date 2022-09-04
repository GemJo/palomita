export default class UuidValidationException extends Error {
  public name;

  constructor(uuid: string) {
    super(`Uuid ${uuid} is not valid`);
    this.name = 'UuidValidationException';
  }
}
