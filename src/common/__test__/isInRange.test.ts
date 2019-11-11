import isInRange from '../isInRange';

describe('isInRange', () => {
  beforeAll(() => {
    jest.mock('../IndexOutOfRangeError');
  });

  it('validates that numbers are within a range', () => {
    expect(isInRange(-1, 0, 3)).toBe(false);
    expect(isInRange(0, -1, 3)).toBe(true);
    expect(isInRange(0, 0, 3)).toBe(true);
    expect(isInRange(1, 0, 3)).toBe(true);
    expect(isInRange(2, 0, 3)).toBe(true);
    expect(isInRange(3, 0, 3)).toBe(true);
    expect(isInRange(3, 0, 2)).toBe(false);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
