export class Greet {

  greet(name: string): string {
    if (!name) {
      return 'Hello!';
    }
    return `Hello, ${name}!`;
  }
}
