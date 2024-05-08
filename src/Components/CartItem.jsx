import PropTypes from "prop-types";
import { FormatPrice } from "../Helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../Context/Cart_Context";

const CartItem = ({ id, name, image, color, price, amount }) => {
  const { removeItem, setIncrease, setDecrease } = useCartContext();

  return (
    <div className="cart_heading grid grid-five-column">
      {/* Image  */}
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        {/* name and color  */}
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>Color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* Price  */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setIncrease={()=> setIncrease(id)}
        setDecrease={()=> setDecrease(id)}
      />

      {/* Subtotal  */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      {/* Remove  */}
      <div>
        <FaTrash className="remove_icon" onClick={()=> removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;

CartItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.any,
  color: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
};
