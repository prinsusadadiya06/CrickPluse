import React, { useEffect, useState } from "react";

const ScrollToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;

      if (!isMobile && footer) {
        const footerTop = footer.getBoundingClientRect().top;

        if (window.scrollY > 300 && footerTop > windowHeight - 100) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      } else {
        //on mobile footer ignore
        if (window.scrollY > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white md:px-8 px-3 md:py-2 py-1 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition z-50 flex items-center gap-2"
        >
          Move to Top ↑
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;