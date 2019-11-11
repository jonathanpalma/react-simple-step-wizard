export default class IndexOutOfRangeError extends Error {
  constructor(number: number, start: number, end: number) {
    super(`Step \`${number}\` is out of range [${start}, ${end - 1}]`);
    this.name = 'IndexOutOfRangeError';
  }
}
