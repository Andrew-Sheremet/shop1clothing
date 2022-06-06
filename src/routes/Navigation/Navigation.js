import { useContext } from "react";
import { Outlet,Link } from "react-router-dom"
import styles from './Navigation.module.scss'
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import UserContext from '../../context/UserContext';
import { CartContext } from "../../context/CartContext";
import {signOutUser} from '../../utils/firebase/firebase';
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdawn from "../../components/CartDropdawn/CartDropdawn";

 

 
const Navigation = () => {

  const {currentUser}=useContext(UserContext)
  const {showCart,ChangeCart} = useContext(CartContext)
 
  return (
    <>
        <div className={styles.navigation}>
            <Link to='/' className={styles['logo-container']}>
              <CrwnLogo/>
              </Link>
            <div className={styles['nav-links-container']}>
              <Link to='/shop' className={styles['nav-link']}>SHOP</Link>
              { currentUser ? (
                <span onClick={signOutUser} className={styles['nav-link']}>Log Out</span>
              ) : (
                <Link to='/sign-in' className={styles['nav-link']}>Sign In</Link>
              )
             
            }
            <CartIcon onClick={ChangeCart}/>
            </div>
        { showCart && <CartDropdawn/>}
        </div>
        <Outlet/>
    </>
  )
}

export default Navigation