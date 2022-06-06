import { useContext } from 'react'
import './cartIcon.scss'
import {ReactComponent as ShoppingIcon} from '../../assets/shoppingBag.svg'
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const {setShowCart,cartCount}=useContext(CartContext)

  const toggle=()=>{
    setShowCart((prev)=>!prev)
  }
  return (
    <div onClick={toggle} className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{cartCount}</span>
    </div>
  )
}

export default CartIcon