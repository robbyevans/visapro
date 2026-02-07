import styled from 'styled-components';
import heroImage from '../../assets/aboutus.png';

// Hero Section
export const HeroSection = styled.section`
  position: relative;
  height: 200px;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 250px;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.9));
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
  max-width: 800px;
`;

export const HeroTitle = styled.h1`
  ccolor: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
`;


// Content Section
export const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const Title = styled.h2`
  color: #10b981;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
`;

// Service Features List
export const ServiceContainer = styled.div`
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem 0;
  text-align: left;
`;

export const ServiceListItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
`;

export const Bullet = styled.span`
  color: #10b981;
  font-size: 1.5rem;
  margin-right: 1rem;
  line-height: 1.6;
  flex-shrink: 0;
`;

export const ServiceText = styled.span`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
`;

// Service Cards
export const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceItem = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const ServiceImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${ServiceItem}:hover & img {
    transform: scale(1.05);
  }
`;

export const ServiceContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    color: #10b981;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.6;
  }
`;