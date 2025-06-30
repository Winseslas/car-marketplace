import { SignIn } from '@clerk/clerk-react'
import Footer from '../../components/common/Footer'
import Header from '../../components/common/Header'

export default function SignInPage() {
  return (
    <>
      <Header />
      <div className='mt-2'>
        <SignIn path="/sign-in" />
      </div>
      <div className='w-full flex justify-center'>
        <Footer />
      </div>
    </>
  )
}