import './CartDropdawn.scss';
import Button from '../Button/Button';
import CartItem from '../CartItem/CartItem';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const CartDropdawn = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdawn