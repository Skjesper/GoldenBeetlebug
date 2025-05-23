import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import styled from '@emotion/styled';

// Props interface för komponenten
interface OrientationOverlayProps {
  children: ReactNode;
}

// Styled component för overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 182, 193, 1);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  color: #333;
  font-size: 24px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const OrientationOverlay: React.FC<OrientationOverlayProps> = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(false);

  const checkOrientation = () => {
    const portrait = window.innerHeight > window.innerWidth;
    setIsPortrait(portrait);
  };

  useEffect(() => {
    // Kolla orientering när komponenten mountas
    checkOrientation();

    // Lyssna på förändringar
    const handleResize = () => {
      checkOrientation();
    };

    const handleOrientationChange = () => {
      // Kort delay för att säkerställa att dimensionerna uppdaterats
      setTimeout(checkOrientation, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <>
      {/* Rendera alltid children */}
      {children}
      
      {/* Visa overlay endast om skärmen är i porträttläge */}
      {isPortrait && (
        <Overlay>
          <div>
            <h2>📱➡️📱</h2>
            <p>Rotera din enhet till liggande läge</p>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default OrientationOverlay;