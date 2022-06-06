import SignUpForm from '../../components/Sing-up-form/SignUpForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import './Authentication.scss'

const Authentication = () => {

  return (
    <div className='auth-container'>
      <SignInForm/>
      <SignUpForm/>
    </div>
  )
}

export default Authentication