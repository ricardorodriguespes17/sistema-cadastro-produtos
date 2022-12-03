import { generateUniqueCod } from '../../src/utils/generateUniqueCod';

describe('testes para o gerador de código único', () => {
  const cod = generateUniqueCod();

  test('testando geração de código válido', () => {
    expect(cod).not.toBeNull();
    expect(cod).not.toBeUndefined();
    expect(typeof cod).toBe("string");
  });

  test('testando uma geração de 1.000 números, se há algum repetido', () => {
    let list = [] as string[];
    let newCod;

    for (let i = 0; i < 1000; i++) {
      newCod = generateUniqueCod();
      expect(list.includes(newCod)).toBe(false);
      list.push(newCod);
    }
  });
});