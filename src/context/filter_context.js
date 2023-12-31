import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontex";
import reducer from'../reducer/filterReducer';

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
}

export const FilterContextProvider = ({children}) => {
    const { products } = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState); 

    // sorting function 
    const sorting = (event) => {
        let userValue = event.target.value;
        return dispatch({type: "GET_SORT_VALUE", payload: userValue});

    }

    
    // to set Grid view

const setGridView = () => {
    return dispatch({type: "SET_GRID_VIEW"});
}
   // to set List View
const setListView = () => {
    return dispatch({type: "SET_LIST_VIEW"});

}

// to sort the product 
useEffect (()=>{
    // console.log("Jewel Rana");
    dispatch({type: "SORTING_PRODUCTS"})

},[state.sorting_value])



    useEffect(()=>{
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});

    },[products]);



    return (
        <FilterContext.Provider value={{...state, setGridView, setListView, sorting}}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext)
}