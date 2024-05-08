import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../Context/FilterContext";
import { FormatPrice } from "../Helpers/FormatPrice";
import { FaCheck } from "react-icons/fa";
import { Button } from "../Styles/Button";

const FilterSection = () => {
  const {
    filters: { text, category, color, price, minPrice, maxPrice },
    updatefiltervalue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // function to get unique category
  const getUniqueData = (data, attr) => {
    let newValue = data.map((elem) => {
      return elem[attr];
    });

    if (attr === "colors") {
      newValue = newValue.flat(); //it will create one string with all indexes values
    }

    newValue = ["All", ...new Set(newValue)];
    return newValue;
  };

  // get category of items
  const categoryOnlyData = getUniqueData(all_products, "category");
  // get company of items
  const companyData = getUniqueData(all_products, "company");
  // get colors of items
  const colorsData = getUniqueData(all_products, "colors");

  return (
    <Wrapper>
      {/* Search filter  */}
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updatefiltervalue}
            placeholder="Search"
            autoComplete="off"
          />
        </form>
      </div>
      {/* category filters  */}
      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyData.map((elem) => {
            return (
              <button
                key={"cat" + elem}
                type="button"
                className={elem === category ? "active" : ""}
                name="category"
                value={elem}
                onClick={updatefiltervalue}
              >
                {elem}
              </button>
            );
          })}
        </div>
      </div>
      {/* Company filter dropdown */}
      <div className="filter-company">
        <select
          name="company"
          id="company"
          className="filter-company--select"
          onClick={updatefiltervalue}
        >
          {companyData.map((elem) => {
            return (
              <option
                key={"com" + elem}
                value={elem}
                name="company"
              >
                {elem}
              </option>
            );
          })}
        </select>
      </div>
      {/* Colors section  */}
      <div className="filter-colors colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorsData.map((elem) => {
            if (elem === "All") {
              return (
                <button
                  type="button"
                  className="color-all--style"
                  style={{
                    textDecoration: color === "All" ? "underline" : "none",
                  }}
                  key={"col" + elem}
                  name="color"
                  value={elem}
                  onClick={updatefiltervalue}
                >
                  All
                </button>
              );
            }
            return (
              <button
                type="button"
                className={elem === color ? "btnStyle active" : "btnStyle"}
                key={"col" + elem}
                style={{ backgroundColor: elem }}
                name="color"
                value={elem}
                onClick={updatefiltervalue}
              >
                {color === elem ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </div>
      </div>
      {/* Price range */}
      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updatefiltervalue}
        />
      </div>
      {/* Clear filters  */}
      <div className="filter-clear">
        <Button className="btn" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
    margin: 4px;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
