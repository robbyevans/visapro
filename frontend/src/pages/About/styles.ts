import styled from 'styled-components';
import heroImage from '../../assets/aboutus.png';

// Hero Section with Background Image
export const HeroSection = styled.section`
  position: relative;
  height: 200px;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: left;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.8),
    rgba(5, 150, 105, 0.9)
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
`;

export const HeroTitle = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Main Content Section
export const MainContent = styled.div`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Section = styled.section`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  }

  h2 {
    color: #10b981;
    font-size: 1.75rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  p {
    color: #64748b;
    line-height: 1.8;
    font-size: 1.05rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;

    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export const SectionTitle = styled.h2`
  color: #10b981;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SectionText = styled.p`
  color: #64748b;
  line-height: 1.8;
  font-size: 1.05rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// CTA Section
export const CTASection = styled.section`
  background: linear-gradient(135deg, #10b981, #059669);
  padding: 5rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

export const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const CTAText = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const CTAButton = styled.button`
  background: #ffffff;
  color: #10b981;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    background: #f0fdf4;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`;

// Legacy styles (kept for backward compatibility)
export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #10b981;
  margin-bottom: 2rem;
  text-align: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;