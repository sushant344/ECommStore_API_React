import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialData = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {}
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const getProducts = async (url) => {
    dispatch({type: "SET_LOADING"})
    try {
      const res = await axios.get(url);
      const products = await res.data;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // single product api call 
  const getsingleProduct = async(url) =>{
    dispatch({type: "SET_SINGLE_LOADING"});
    try {
      const res = await axios.get(url);
      const singleProduct = await res.data;
      dispatch({type: "SET_SINGLE_PRODUCT", payload: singleProduct})
    } catch (error) {
      dispatch({type: "SET_SINGLE_ERROR"});
    }
  }

  useEffect(() => {
    getProducts(API);
  },[]);

  const Values = useMemo(()=> ({...state, getsingleProduct}),[state])

  return (
    <AppContext.Provider value={Values}>{children}</AppContext.Provider>
  );
};

// custom hook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };

AppProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
