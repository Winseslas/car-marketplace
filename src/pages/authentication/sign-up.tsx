import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
  return <div className='mt-2'>
    <SignUp path="/sign-up" />
  </div> 
}