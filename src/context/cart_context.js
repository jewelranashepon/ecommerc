import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/cartReducer';

const CartContext = createContext();

const getLocalCartData = () => {
    let newCartData = localStorage.getItem("jewelCart");
    if(newCartData == []){
        return [];
    }
    else{
        return JSON.parse(newCartData);

    }
}

const initialState = {
    cart: getLocalCartData(),
    total_item: "",
    total_amount: "",
    shipping_fee: "5000",

}

const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addCart = (id, color, amount, product) => {
        dispatch( {type: "ADD_TO_CART", payload: {id, color, amount, product}} );
    }

    // set increment and decrement
    const setDecrement = (id) => {
        dispatch({type: "SET_DECREMENT", payload: id});
    }

    const setIncrement = (id) => {
        dispatch({type: "SET_INCREMENT", payload: id});
    }

    const removeItem = (id) => {
        dispatch({type: "REMOVE_ITEM", payload: id});
    }

     // clear the cart
     const clearCart = () => {
        dispatch({type: "CLEAR_CART"});
     }

    // to add data to the localStorage
    useEffect(()=>{
        dispatch({type: "CART_TOTAL_ITEM"});
        dispatch({type: "CART_TOTAL_PRICE"});
        // dispatch({type: "CART_TOTAL_SHIPPING_FEE"});

        localStorage.setItem("jewelCart", JSON.stringify(state.cart));
    },[state.cart]);

   


    return (
     <CartContext.Provider 
        value={{...state, addCart, removeItem, clearCart, setDecrement, setIncrement}}>
        {children}
    </CartContext.Provider>
    );

}

export const useCartContext = () => {
    return useContext(CartContext);
}

export {CartProvider};