const isInRange = (number: number, start: number, end: number): boolean =>
  number >= Math.min(start, end) && number < Math.max(start, end);

export default isInRange;
