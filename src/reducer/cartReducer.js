const cartReducer = (state, action) => {
  switch (action.type) {
    // Add products in cart --
    case "ADD_TO_CART": {
      let { id, color, amount, product } = action.payload;

      //   find if product is exist in cart
      let existingProduct = state.cart.find((elem) => {
        return elem.id === id + color;
      });

      //   if product is exist in cart then update only amount
      if (existingProduct) {
        let updatedproducts = state.cart.map((elem) => {
          if (elem.id === id + color) {
            // update existing product amount
            let newAmount = elem.amount + amount;
            // amount is greater than stock then amount = stock
            if (newAmount >= elem.max) {
              newAmount = elem.max;
            }
            return {
              ...elem,
              amount: newAmount,
            };
          } else {
            return elem;
          }
        });

        return {
          ...state,
          cart: updatedproducts,
        };
      }
      //   if item is not exist in cart then add in cart
      else {
        let cartProduct;
        cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }
    }

    // Increment quantity in cart --
    case "SET_INCREMENT":{
        let updatedproduct = state.cart.map((elem)=>{
            if(elem.id === action.payload){
                let incAmount = elem.amount + 1;
                if(incAmount >= elem.max){
                    incAmount = elem.max;
                }
                return{
                    ...elem,
                    amount: incAmount
                }
            }
            else{
                return elem;
            }
        })
        return{
            ...state,
            cart: updatedproduct
        }
    }

    // Decrement quantity in cart --
    case "SET_DECREMENT":{
        let updatedproduct = state.cart.map((elem)=>{
            if(elem.id === action.payload){
                let decAmount = elem.amount - 1;
                if(decAmount <= 1){
                    decAmount = 1;
                }
                return{
                    ...elem,
                    amount: decAmount
                }
            }
            else{
                return elem;
            }
        })
        return{
            ...state,
            cart: updatedproduct
        }
    }

    // Show total items and price in cart --
    case "CART_TOTAL_ITEMS_PRICE":{
      let { total_item, total_price} = state.cart.reduce((accum, elem)=>{
        let { price, amount } = elem;

        accum.total_item += amount;
        accum.total_price += price * amount;
        return accum;
      },{
        total_item : 0,
        total_price :0
      })
      return{
        ...state,
        total_item,
        total_price
      }
    }

    // Remove items in cart --
    case "REMOVE_ITEM": {
      let updatedCart = state.cart.filter((elem) => {
        return elem.id !== action.payload;
      });
      return {
        ...state,
        cart: updatedCart,
      };
    }

    // Clear all items --
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
