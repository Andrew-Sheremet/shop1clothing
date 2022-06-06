import { useState } from 'react'
import {createAuthUserWithEmailAndPassword,createUserDocumentFromAuth} from '../../utils/firebase/firebase'
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';


import './SignUpForm.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields;
  

  const handleChange = (e) => {
      const {name,value}= e.target;
      setFormFields({...formFields,[name]:value})
    
  }

  const resetFormFields =()=>{
    setFormFields(defaultFormFields)
  }
  const createUser =async(e)=>{
e.preventDefault()
    if(password !== confirmPassword){
      alert('your password do not match')
      return;
    }
    try {
      const {user}= await createAuthUserWithEmailAndPassword(email,password)
      await createUserDocumentFromAuth(user,{displayName})
      

      resetFormFields()
    } catch (error) {
      console.log('something went wrong',error.message)
    }
  }


  return (
    <div className='sign-up-container'>
      <h2>Don`t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={createUser}>
        <FormInput
        label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
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
        <FormInput
        label='Confirm Password'
          onChange={handleChange}
          name='confirmPassword'
          type='password'
          required
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
