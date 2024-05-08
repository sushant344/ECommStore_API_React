import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import PropTypes from "prop-types";

const CartContext = createContext();

const getlocalcartdata = () =>{
    let getcartData = localStorage.getItem("cartItems");
    if(getcartData){
        return JSON.parse(getcartData);
    }
    else{
        return [];
    }
}

const initialState = {
    cart: getlocalcartdata(),
    total_item: 0,
    total_price: 0,
    shipping_fee: 5000
}

const CartProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer, initialState);

    // add to cart 
    const addToCart = (id, color, amount, product) =>{
        dispatch({type: "ADD_TO_CART", payload: {id, color, amount, product}})
    }
    // add cart items to local storage 
    useEffect(()=>{
        // dispatch({type: "CART_TOTAL_ITEMS"});
        // dispatch({type: "CART_TOTAL_PRICE"});
        dispatch({type: "CART_TOTAL_ITEMS_PRICE"});
        localStorage.setItem("cartItems", JSON.stringify(state.cart))
    }, [state.cart])

    // increase and decrease amount of existing products of cart
    const setIncrease = (id) =>{
        dispatch({type: "SET_INCREMENT", payload: id});
    }
    const setDecrease = (id) =>{
        dispatch({type: "SET_DECREMENT", payload: id});
    }

    // remove cart items 
    const removeItem = (id) =>{
        dispatch({type: "REMOVE_ITEM", payload: id});
    }

    // clear cart 
    const clearCart = () =>{
        dispatch({type: "CLEAR_CART"});
    }

    const Value = useMemo(()=> ({...state, addToCart, setIncrease, setDecrease, removeItem, clearCart}), [state])

    return <CartContext.Provider value={Value}>
        {children}
    </CartContext.Provider>
}

const useCartContext = () =>{
    return useContext(CartContext);
}

export { CartProvider, useCartContext };

CartProvider.propTypes = {
    children: PropTypes.any.isRequired,
};