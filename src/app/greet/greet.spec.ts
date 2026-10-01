import { Greet } from './greet';

describe('Greet', () => {
  let greet: Greet;

  beforeEach(() => {
    greet = new Greet();
  });

  it('should greet a given name', () => {
    expect(greet.greet('Marco')).toBe('Hello, Marco!');
  });

  it('should greet generically when no name is provided', () => {
    expect(greet.greet('')).toBe('Hello!');
  });
});
