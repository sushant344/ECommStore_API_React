import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import CartAmountToggle from "./CartAmountToggle"
import { NavLink } from "react-router-dom";
import { Button } from "../Styles/Button";
import PropTypes from "prop-types";
import { useCartContext } from "../Context/Cart_Context";

const AddtoCart = ({ product }) => {

  const {addToCart} = useCartContext();

  const { id, colors, stock } = product;
  const [activeColor, setActiveColor] = useState(colors[0]);

  const [amount, setAmount] = useState(1);
  const setIncrease = () =>{
    amount < stock ? setAmount(amount + 1) : setAmount(stock);
  }

  const setDecrease = () =>{
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  }

  return (
    <Wrapper>
      <div className="colors">
        <p>
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{backgroundColor: curColor}}
                className={activeColor === curColor ? "btnStyle active" : "btnStyle"}
                onClick={()=> setActiveColor(curColor)}
              >
                {activeColor === curColor ? (
                  <FaCheck className="checkStyle" />
                ) : null}
              </button>
            );
          })}
        </p>
      </div>
      {/* add to cart toggle  */}
      <CartAmountToggle amount={amount} setIncrease={setIncrease} setDecrease={setDecrease} />

      <NavLink to="/cart">
        <Button className="btn" onClick={()=> addToCart(id, activeColor, amount, product)}>Add to Cart</Button>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddtoCart;

AddtoCart.propTypes = {
  product: PropTypes.any,
  id: PropTypes.any,
  colors: PropTypes.any,
  stock: PropTypes.number
}