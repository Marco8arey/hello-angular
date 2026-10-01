export class Currencies {

  convert(amount: number, rate: number): number {
    if (rate <= 0) {
      throw new Error('El tipo de cambio debe ser mayor a cero');
    }
    return Math.round(amount * rate * 100) / 100;
  }

  mxnToUsd(amount: number): number {
    return this.convert(amount, 0.058);
  }
}
