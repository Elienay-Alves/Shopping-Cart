require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it ('Teste se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it ('2 - Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it ('3 - Teste se, ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  })

  it('4 - Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo', async () => {
    const result = await fetchProducts('computador');
    await expect(result).toBe(computadorSearch);
  })

  it ('5 - Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url'));
  })
});


/*Documentações:
  https://jestjs.io/pt-BR/docs/expect#expectassertionsn%C3%BAmero
  https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  https://jestjs.io/pt-BR/docs/tutorial-async#rejects

Pessoas que me ajudaram:
  Igor Sousa - Trocamos idéia enquanto faziamos a questão 1.
  Carlos - Papo sobre mentalidade e sindrome do impostor.*/