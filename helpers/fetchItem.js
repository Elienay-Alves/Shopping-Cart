const fetchItem = async (itemId) => {
  if (itemId) {
    const result = await fetch(`https://api.mercadolibre.com/items/${itemId}`);

    return result.json();
  }
  
  throw new Error('You must provide an url');
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
