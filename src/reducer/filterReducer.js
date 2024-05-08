const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {
      let priceArr = action.payload.map((elem) => {
        return elem.price;
      });
      let maxPrice = Math.max(...priceArr);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE": {
      return {
        ...state,
        sorting_value: action.payload,
      };
    }

    case "SORTING_PRODUCTS": {
      let newsortdata;
      let { filter_products, sorting_value } = state;
      let tempsortproducts = [...filter_products];

      const Sortingproducts = (a, b) => {
        switch (sorting_value) {
          case "highest":
            return b.price - a.price;

          case "lowest":
            return a.price - b.price;

          case "a-z":
            return a.name.localeCompare(b.name);

          case "z-a":
            return b.name.localeCompare(a.name);

          default:
            return state;
        }
      };
      newsortdata = tempsortproducts.toSorted(Sortingproducts);

      return {
        ...state,
        filter_products: newsortdata,
      };
    }

    case "UPDATE_FILTERS_VALUE": {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }

    case "FILTER_PRODUCTS": {
      const { all_products } = state;
      let tempFilterProducts = [...all_products];
      const { text, category, company, color, price } = state.filters;

      if (text) {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.name.toLowerCase().includes(text);
        });
      }

      if (category !== "All") {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.category.toLowerCase() === category.toLowerCase();
        });
      }
      if (company !== "All") {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.company.toLowerCase() === company.toLowerCase();
        });
      }
      if (color !== "All") {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.colors.includes(color);
        });
      }
      if (price === 0) {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.price === price;
        });
      } else {
        tempFilterProducts = tempFilterProducts.filter((elem) => {
          return elem.price <= price;
        });
      }
      return {
        ...state,
        filter_products: tempFilterProducts,
      };
    }

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          text: "",
          category: "All",
          company: "All",
          color: "All",
          price: state.filters.maxPrice,
          minPrice: 0,
          maxPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};
export default filterReducer;
