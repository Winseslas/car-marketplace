import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: 'Mike White',
      location: 'New York, NY',
      text: 'Grâce à cette plateforme, j\'ai pu trouver la voiture de mes rêves à un prix imbattable. Le processus d\'enchères est transparent et facile à utiliser. Je recommande vivement ce service à tous les passionnés d\'automobiles.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Los Angeles, CA',
      text: 'Service exceptionnel ! L\'équipe est très professionnelle et à l\'écoute. J\'ai économisé des milliers d\'euros sur mon achat de voiture de collection.',
      image: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      id: 3,
      name: 'David Chen',
      location: 'Chicago, IL',
      text: 'La meilleure plateforme d\'enchères automobiles en ligne. Interface intuitive et sécurisée. Je reviendrai certainement pour mon prochain achat !',
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];

  const teamMembersImages = [
    'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-About_company-768x695.jpg',
    'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-member01-768x695.jpg',
    'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-member2-768x695.jpg',
    'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-member3-768x695.jpg'
  ]
  const teamMembers = [
    { id: 1, name: 'Adison Ray', role: 'Coordonnateur des enchères', image: teamMembersImages[0] },
    { id: 2, name: 'Arthur Roy', role: 'Représentant des ventes', image: teamMembersImages[1] },
    { id: 3, name: 'Regina George', role: 'Observateur des enchères', image: teamMembersImages[2] },
    { id: 4, name: 'William State', role: 'Spécialiste du marketing', image: teamMembersImages[3] },
  ];

  const partners = [
    { id: 1, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client1.png', name: 'Partner 1' },
    { id: 2, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client2.png', name: 'Partner 2' },
    { id: 3, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client3.png', name: 'Partner 3' },
    { id: 4, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client4.png', name: 'Partner 4' },
    { id: 5, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client5.png', name: 'Partner 5' },
    { id: 6, logo: 'https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-Client6.png', name: 'Partner 6' }
  ];

  const [isButtonActive, setIsButtonActive] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat py-32 px-4 sm:px-6 lg:px-8"
        style={{ backgroundImage: 'url(https://autobid.modeltheme.com/wp-content/uploads/2023/11/Autobid-About_comp.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('pages.aboutPage.hero.title', 'À propos de nous')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {t('pages.aboutPage.hero.subtitle', 'DÉCOUVREZ, ENCHÉRISSEZ ET GAGNEZ - VOTRE PORTAIL VERS DES EXPÉRIENCES D\'ENCHÈRES EXCEPTIONNELLES !')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                {t('pages.aboutPage.mission.title', 'Notre mission dans l\'entreprise')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('pages.aboutPage.mission.description', 'Notre mission est de révolutionner le marché des enchères automobiles en offrant une plateforme transparente, sécurisée et facile à utiliser pour les amateurs de voitures du monde entier. Nous nous engageons à fournir un service exceptionnel et à créer une communauté passionnante autour des véhicules d\'exception.')}
              </p>
              <hr />
              <div className="flex items-center mt-8">
                <span className="text-6xl font-bold text-orange-500 mr-4">24</span>
                <div className="border-l-2 border-gray-300 pl-6">
                  <span className="block text-2xl font-semibold text-gray-800">{t('pages.aboutPage.mission.years', 'Années')}</span>
                  <span className="text-gray-500">{t('pages.aboutPage.mission.market', 'sur le marché')}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Notre équipe"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  24
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('pages.aboutPage.team.title', 'L\'équipe derrière l\'entreprise')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
                    <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-blue-400 transition-colors duration-200">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600 mt-4">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('pages.aboutPage.partners.title', 'Nos partenaires de confiance')}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 mt-4">
            {partners.map((partner) => (
              <div key={partner.id} className="h-16 w-auto">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              {t('pages.aboutPage.testimonials.title', 'Témoignages : ce que disent nos clients')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('pages.aboutPage.testimonials.subtitle', 'Découvrez maintenant')}
            </p>
            <Link
              to="/services"
              className={`inline-block items-center px-6 py-3 border-2 text-base font-semibold rounded-md shadow-sm transition-colors duration-200 ${isButtonActive
                  ? 'bg-white text-black border-black'
                  : 'bg-white text-black border-black hover:bg-orange-600 hover:border-transparent hover:text-white'
                }`}
              onMouseDown={() => setIsButtonActive(true)}
              onMouseUp={() => setIsButtonActive(false)}
              onMouseLeave={() => setIsButtonActive(false)}
            >
              {t('pages.aboutPage.testimonials.cta', 'Nos services')}
            </Link>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <div className="absolute top-4 right-4 text-4xl text-gray-200">"</div>
            <h3 className="text-xl font-semibold mb-4 text-center">
              {t('pages.aboutPage.testimonials.quote.title')}
            </h3>
            <p className="text-gray-600 mb-0 text-center line-clamp-3 h-[7.5rem] overflow-hidden">
              {testimonials[currentTestimonial].text}
            </p>
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={prevTestimonial}
                className="border-transparent hover:border-gray-600 focus:outline-none focus:ring-0 transition-colors" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                    aria-label={`Voir le témoignage ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="border-transparent hover:border-gray-600 focus:outline-none focus:ring-0 transition-colors" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
