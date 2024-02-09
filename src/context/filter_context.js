import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontex";
import reducer from'../reducer/filterReducer';

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: 0,
        minPrice: 0,
        maxPrice: 0,
      },
}

export const FilterContextProvider = ({children}) => {
    const { products } = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState); 

    // to clear the filters
    const cleaeFilters = () => {
        dispatch({type: "CLEAR_FILTERS"});
    }

    // sorting function 
    const sorting = (event) => {
        let userValue = event.target.value;
        return dispatch({type: "GET_SORT_VALUE", payload: userValue});

    }

    // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

    
    // to set Grid view

const setGridView = () => {
    return dispatch({type: "SET_GRID_VIEW"});
}
   // to set List View
const setListView = () => {
    return dispatch({type: "SET_LIST_VIEW"});

}

useEffect (()=>{
    dispatch({ type: "FILTER_PRODUCTS" });

},[state.filters]);

// to sort the product 
useEffect (()=>{
    // console.log("Jewel Rana");
    dispatch({type: "SORTING_PRODUCTS"});
   

},[state.sorting_value])



    useEffect(()=>{
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products});

    },[products]);



    return (
        <FilterContext.Provider
         value={{...state,
          setGridView, 
          setListView,
           sorting, 
           updateFilterValue,
           cleaeFilters
           }}>
            {children}
        </FilterContext.Provider>
    )

}

export const useFilterContext = () => {
    return useContext(FilterContext)
}