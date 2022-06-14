import { createContext, useEffect,useReducer } from 'react'
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '.././utils/firebase/firebase'

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
})

const userReducer = (state,action)=>{
  switch (action.type) {
    case 'SET_CURRENT_USER':
    return{
      ...state,
      currentUser:action.payload
    }
  
    default:
      throw new Error(`pizda ${action.type}`)
  }
}

const INITIAL_STATE ={
  currentUser:null
}

export const UserProvider = ({ children }) => {
const [state,dispatch]=useReducer(userReducer,INITIAL_STATE)
const setCurrentUser=(user)=>{
  dispatch({type:'SET_CURRENT_USER',payload:user})
}

  const value = { currentUser:state.currentUser, setCurrentUser }

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContext
