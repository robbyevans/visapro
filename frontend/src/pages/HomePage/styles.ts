import styled from "styled-components";

export const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 24px;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FeaturesSection = styled.section`
  padding: 80px 24px;
  background: white;
`;

export const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FeaturesTitle = styled.h2`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 60px;
  color: #111827;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

export const FeatureCard = styled.div`
  text-align: center;
  padding: 32px;
  border-radius: 8px;
  background: #f8fafc;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
`;

export const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`;
