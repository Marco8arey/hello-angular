import { Compute } from './compute';

describe('Compute', () => {
  let compute: Compute;

  beforeEach(() => {
    compute = new Compute();
  });

  it('should add 2 + 2 = 4', () => {
    expect(compute.add(2, 2)).toBe(4);
  });

  it('should subtract 5 - 3 = 2', () => {
    expect(compute.subtract(5, 3)).toBe(2);
  });

  it('should multiply 4 * 3 = 12', () => {
    expect(compute.multiply(4, 3)).toBe(12);
  });

  it('should divide 10 / 2 = 5', () => {
    expect(compute.divide(10, 2)).toBe(5);
  });

  it('should throw when dividing by zero', () => {
    expect(() => compute.divide(1, 0)).toThrowError('No se puede dividir entre cero');
  });
});
