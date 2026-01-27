import styled from 'styled-components';

// Hero Section
export const HeroSection = styled.section`
  position: relative;
  height: 60vh;
  background: linear-gradient(135deg, #10b981, #059669);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  color: white;
  font-size: 4rem;
  font-weight: bold;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Who We Are Section
export const WhoWeAreSection = styled.section`
  display: flex;
  align-items: center;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 3rem 1rem;
    gap: 2rem;
  }
`;

export const WhoWeAreImage = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

export const WhoWeAreContent = styled.div`
  flex: 1;
`;

export const WhoWeAreTitle = styled.h2`
  color: #10b981;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const WhoWeAreText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const ServiceItem = styled.li`
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  padding-left: 1rem;
`;

export const BookButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #059669;
    transform: translateY(-2px);
  }
`;

// Mission Section
export const MissionSection = styled.section`
  display: flex;
  align-items: center;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;
  // background: #f8fafc;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 3rem 1rem;
    gap: 2rem;
  }
`;

export const MissionContent = styled.div`
  flex: 1;
`;

export const MissionTitle = styled.h2`
  color: #10b981;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const MissionText = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const MissionImage = styled.div`
  flex: 1;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

// CTA Section
export const CTASection = styled.section`
  background: linear-gradient(135deg, #10b981, #059669);
  padding: 5rem 2rem;
  text-align: center;
`;

export const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CTAText = styled.p`
  color: white;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
`;

export const CTAButton = styled.button`
  background: white;
  color: #10b981;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;