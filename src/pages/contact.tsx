// import { Link } from 'react-router-dom'
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      {/* <ul>
        <li>
          <Link to="/">Return to Index</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul> */}

      <div className='w-full flex justify-center'>
        <Footer />
      </div>
    </>
  )
}