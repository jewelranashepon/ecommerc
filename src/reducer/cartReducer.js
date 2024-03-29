import React from 'react'

const cartReducer = (state, action) => {
    if(action.type === "ADD_TO_CART"){
        let {id, color, amount, product} = action.payload;
        
        // tackle the existing product
        let existingProduct = state.cart.find((curElem) => curElem.id === id+color);

        if(existingProduct){
            let updatedProduct = state.cart.map((curElem)=>{
                if(curElem.id===id+color){
                    let newAmount = curElem.amount+amount;

                    if( newAmount>= curElem.max ){
                        newAmount = curElem.max;
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    }
                }
                else{
                    return curElem;
                }
            });

            return {
                ...state,
                cart: updatedProduct,
            }

        }
        else {
            let cartProduct = {
            id: id+color,
            name: product.name,
            color,
            amount,
            image: product.image[0].url,
            price: product.price,
            max: product.stock,
        }

        return {
            ...state,
            cart: [...state.cart, cartProduct],
        }
     }
     
    }

    if(action.type==="REMOVE_ITEM"){
        let updatedCart = state.cart.filter((curItem)=> 
            curItem.id !== action.payload           
        );
        return {
            ...state,
            cart: updatedCart,
        }
    }

    // to empty or clear the cart 
    if(action.type==="CLEAR_CART"){
        return {
            ...state,
            cart: [],
        }

    }

    // to set increment and decrement

    if(action.type==="SET_DECREMENT"){
        let updatedProduct = state.cart.map((curElem) =>{
            if(curElem.id===action.payload){
                let decAmount = curElem.amount - 1;

                if( decAmount<=1){
                    decAmount=1;
                }

                return {
                    ...curElem,
                    amount: decAmount,
                }
            }
            else {
                return curElem;
            }

        });

        return {
            ...state,
            cart: updatedProduct,
        }
        
    }

    // set Increment

    if(action.type==="SET_INCREMENT"){
        let updatedProduct = state.cart.map((curElem) =>{
            if(curElem.id===action.payload){
                let incrementAmount = curElem.amount + 1;

                if( incrementAmount >= curElem.max){
                    incrementAmount = curElem.max;
                }

                return {
                    ...curElem,
                    amount: incrementAmount,
                }
            }
            else {
                return curElem;
            }

        });

        return {
            ...state,
            cart: updatedProduct,
        }
        
    }

    if(action.type==="CART_TOTAL_ITEM"){
        let updatedItemValue = state.cart.reduce((initialVal, curElem)=> {
            let {amount} = curElem;
            initialVal = initialVal + amount;

            return initialVal;

        },0);

        return {
            ...state,
            total_item: updatedItemValue,
        }
    }

    if(action.type === "CART_TOTAL_PRICE"){
        let total_price = state.cart.reduce((initialVal, curElem)=>{
            let {price, amount} = curElem;

            initialVal = initialVal + price * amount ;

            return initialVal;

        },0);

        return {
            ...state,
            total_amount: total_price,
        }
    }
    



    return state;
}

export default cartReducer;