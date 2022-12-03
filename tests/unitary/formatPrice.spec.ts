import { formatPrice } from '../../src/utils/formatPrice';

describe('testes para a função de formatar preço', () => {
  const price = formatPrice(9.9);

  test('testando se o preço vem com os símbolos monetários', () => {
    expect(price).toContain("R$");
  });

  test('testando se o preço vem com vírgula', () => {
    expect(price).toContain(",");
  });

  test('testando se o preço vem com vírgula', () => {
    expect(formatPrice(1000)).toContain(".");
  });

  test('testando se o preço contém duas casas após a virgula', () => {
    expect(formatPrice(10)).toContain(",00");
  });
});