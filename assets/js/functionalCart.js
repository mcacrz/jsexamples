const shop = [
  {
    "2":{
      uuid:"2",
      type:"Frutas",
      title:"Maça Gala",
      price:0.50
    }
  },
  {
    "1010":{
      uuid:"1010",
      type:"Higiene",
      title:"Shampoo Head&Shoulders",
      price:8.50
    }
  },
  {
    "1350":{
      uuid:"1350",
      type:"Bebidas",
      title:"Coca-Cola",
      price:6.80
    }
  }
]
const state = {
  cart:[]
};

ShopCart = () => {
  const formatCurrency = Intl.NumberFormat('pt-BR',{style:"currency",currency:"BRL"});
  const product = (...shopItem) => () => Object.assign({},shopItem);
  const addItem = (shop) => (uuid) => shop.map(item => (Object.entries(item)[0][0] === uuid.toString()) ? product(Object.entries(item)[0][1]) : false).filter(item => item !== false);
  const removeItem = (cart) => (uuid) => cart.filter(item => item[0]()[0]['uuid'] !== uuid.toString());
  const listItens = (cart) => cart.map(item => item[0]());
  const getSubTotal = (cart) => formatCurrency.format(cart.reduce((acc,item) => acc += item[0]()[0]['price'],0));
  const getFromCart = (cart) => (child) => cart.map(item => item[0]()[0][child]);
  const getFromShop = (shop) => (child) => shop.map(item => Object.entries(item)[0][1][child]); 
  return{
    addItem:addItem,
    listItens:listItens,
    getSubTotal:getSubTotal,
    removeItem:removeItem,
    getFromCart:getFromCart,
    getFromShop:getFromShop
  }
}

module.exports = ShopCart;