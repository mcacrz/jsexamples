ShopCart = () => {
  const state = {};
  const main = () => {
    state.shop = null;
    state.cart = [];
  }
  const formatCurrency = Intl.NumberFormat('pt-BR',{style:"currency",currency:"BRL"});
  const addShopCatalog = (struct) => state.shop = struct;
  const add = (item) => state.cart = state.cart.concat(_addItem(item));
  const remove = (item) => state.cart = _removeItem(item);
  const addQtd = (uuid) => state.cart.forEach(item => (item.uuid === uuid.toString()) ? item.qtd++ : false);
  const removeQtd = (uuid) => state.cart.forEach(item => (item.uuid === uuid.toString()) ? item.qtd-- : false); 
  const getSubTotal = () => formatCurrency.format(state.cart.reduce((acc,item) => acc += item.price * item.qtd,0));
  const getFromCart = (child,needle) => state.cart.map(item => {
    if(typeof child !== 'undefined'){ 
      if(typeof item.uuid !== 'undefined' && item.uuid === child){
        return (typeof needle === 'string') ? item[needle] : item;
      }else{
        return false;
      }
    }
    return item;
  }).filter(item => item !== false);
  const getFromShop = (child,needle) => state.shop.map(item => {
    if(typeof child !== 'undefined'){ 
      if(typeof item.uuid !== 'undefined' && item.uuid === child){
        return (typeof needle === 'string') ? item[needle] : item;
      }else{
        return false;
      }
    }
    return item;
  }).filter(item => item !== false);
  const _addItem = (uuid) => state.shop.map(item => (item.uuid === uuid.toString()) ? Object.assign({},item) : false).filter(item => item !== false);
  const _removeItem = (uuid) => state.cart.filter(item => item[0].uuid !== uuid.toString());
  const _comp = (...fns) => (initialArg) => fns.reduce((acc,item) => item(acc),initialArg);
  main();

  return{
    addShopCatalog:addShopCatalog,
    add:add,
    remove:remove,
    addQtd:addQtd,
    removeQtd:removeQtd,
    getSubTotal:getSubTotal,
    getFromCart:getFromCart,
    getFromShop:getFromShop
  }
}

//export default ShopCart;