import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return <div className='mt-2'>
    <SignIn path="/sign-in" />
  </div>
}