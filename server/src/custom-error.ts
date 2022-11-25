/**
 * Class to extend normal error with status htttp status field
 */
class CustomError extends Error {
  public status;
  /**
   *
   * @param {string} message
   * @param {number} status
   */
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export default CustomError;
