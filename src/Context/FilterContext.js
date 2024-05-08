import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { useProductContext } from "./Context";
import reducer from "../reducer/filterReducer";
import PropTypes from "prop-types"

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value : "lowest",
  filters: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    price: 0,
    minPrice: 0,
    maxPrice: 0
  }
};

export const FilterProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to clear filters 
  const clearFilters = () =>{
    dispatch({type: "CLEAR_FILTERS"});
    document.getElementById("company").value = "All";
  }

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // search func 
   const updatefiltervalue = (e) =>{
    const {name, value} = e.target;
    return dispatch({type: "UPDATE_FILTERS_VALUE", payload: {name, value}});
  }

  // sorting products 
  const sorting = (event) =>{
    let uservalue = event.target.value;
    dispatch({type: "GET_SORT_VALUE", payload: uservalue});
  }
  useEffect(()=>{
    dispatch({type: "FILTER_PRODUCTS"});
    dispatch({type: "SORTING_PRODUCTS"});
  },[products, state.sorting_value, state.filters])

  // filter products 
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  const values = useMemo(()=> ({ ...state, setGridView, setListView, sorting, updatefiltervalue, clearFilters }), [state] );

  return (
    <FilterContext.Provider value={values}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

FilterProvider.propTypes = {
  children: PropTypes.any,
}
