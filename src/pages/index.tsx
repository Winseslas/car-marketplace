import Categories from '../components/Categories';
import Footer from '../components/Footer'
import Header from '../components/Header';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import PopularCars from '../components/PopularCars';
import Testimonials from '../components/Testimonials';

export default function IndexPage() {
  return (
    <div>
      <div>
        <Header />
        <Hero />
        <div className='w-full flex justify-center'>
          <Categories />
        </div>
        <div className='w-full flex justify-center'>
          <PopularCars />
        </div>
        <div className='w-full flex justify-center'>
          <Testimonials />
        </div>
        <div className='w-full flex justify-center'>
          <InfoSection />
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <Footer />
      </div>
    </div>
  )
}