import { createContext, useReducer } from 'react'

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  )

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

const cartReducer = (state, action) => {
  const {type,payload}=action
  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      }
    case 'SHOW_CART':
      return {
        ...state,
        showCart: !state.showCart,
      }

    default:
      throw new Error(`error type ${action.type}`)
  }
}

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}
export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
})

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { showCart,cartItems,cartCount,cartTotal } = state;

  const setShowCart = (bool) => {
    dispatch({ type: 'SHOW_CART', payload:bool })
  }

  const updateCartItemReducer = (newCartItems) => {
    const NewCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: NewCartCount,
      },
    })
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    updateCartItemReducer(newCartItems)
  }

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems =  removeCartItem(cartItems, cartItemToRemove)
    
    updateCartItemReducer(newCartItems)
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemReducer(newCartItems)
  }

  const value = {
    showCart,
    setShowCart,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
