import { useState} from 'react'
import {
  signInUserWithEmailAndPassword,
 
  signInWithGooglePopup,
} from '../../utils/firebase/firebase'
import FormInput from '../FormInput/FormInput'
import Button from '../Button/Button'


import './SignInForm.scss'

const defaultFormFields = {
  email: '',
  password: '',
}
const SignInWithGoogle = async () => {
   await signInWithGooglePopup()
 
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields;
  


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
  const createUser = async (e) => {
    e.preventDefault()

    try {
      await signInUserWithEmailAndPassword(email,password);
      
      resetFormFields()
    } catch (error) {
     switch(error.code){
      case 'auth/user-not-found':
        alert('no user associated with this email')
        break;
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
       default: console.log(error)
     }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={createUser}>
        <FormInput
          label='Email'
          onChange={handleChange}
          name='email'
          type='email'
          required
          value={email}
        />
        <FormInput
          label='Password'
          onChange={handleChange}
          name='password'
          type='password'
          required
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' onClick={SignInWithGoogle} buttonType='google'>
           Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
