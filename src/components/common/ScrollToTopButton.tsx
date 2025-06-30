import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-orange-600 hover:bg-white text-white hover:text-orange-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 border-2 border-transparent hover:border-orange-600"
          aria-label="Retour en haut de la page"
        >
          <FaArrowUp className="text-xl font-bold" />
        </button>
      )}
    </div>
  );
}