import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fade-in');
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fade-out');
      setShouldAnimate(false);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fade-out') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fade-in');
        setShouldAnimate(true);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div 
      className={`page-transition ${transitionStage}`}
      data-animate={shouldAnimate ? 'true' : 'false'}
    >
      {children}
    </div>
  );
};

export default PageTransition;
