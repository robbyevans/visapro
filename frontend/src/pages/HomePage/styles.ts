import styled from "styled-components";
import kenyanAthleteHero from "../../assets/_111858986_kipchogetopbody.png";

export const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Hero Section
export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(${kenyanAthleteHero}) center/cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  /* Remove any dark overlays and make image bright */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(
      255,
      255,
      255,
      0.1
    ); /* Very light overlay to enhance readability */
    backdrop-filter: blur(0px); /* Remove blur from background */
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Remove dark overlay completely */
`;

export const HeroContent = styled.div`
  position: relative;
  max-width: 800px;
  text-align: center;
  padding: 0 24px;
  z-index: 2;
  top: 70px;
`;

export const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: 800;
  color: white;
  margin-bottom: 24px;
  line-height: 1.1;

  /* Glass glossy background effect */
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  /* border: 1px solid rgba(255, 255, 255, 0.2); */
  padding: 30px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1);

  /* Text shadow for better readability */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 48px;
    padding: 25px 30px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
    padding: 20px 25px;
    border-radius: 16px;
  }
`;

export const HeroHighlight = styled.span`
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none; /* Remove text shadow for the highlighted part */
`;

export const HeroSubtitle = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 48px;
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  /* Optional: Add subtle glass effect to stats if desired */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

// ... (rest of the styles remain exactly the same)
export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const SectionHeader = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

export const SectionPreTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.5;
  }
`;

// Features Section
export const FeaturesSection = styled.section`
  padding: 120px 0;
  background: white;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const FeatureCard = styled.div`
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  background: #f8fafc;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    background: white;
  }

  @media (max-width: 1024px) {
    padding: 32px 20px;
    min-height: 200px;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    min-height: auto;
    transform: none;

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    border-radius: 12px;
  }
`;

export const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;

  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
    font-size: 24px;
    margin-bottom: 16px;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    font-size: 22px;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    margin-bottom: 12px;
    border-radius: 14px;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
  line-height: 1.3;

  @media (max-width: 1024px) {
    font-size: 18px;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    font-size: 17px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 15px;
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 1.4;
  }
`;

// Process Section
export const ProcessSection = styled.section`
  padding: 120px 0;
  background: #f8fafc;
`;

export const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

export const ProcessCard = styled.div`
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const ProcessStep = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: 700;
`;

export const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #111827;
`;

export const ProcessDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
  font-size: 14px;
`;

// CTA Section
export const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
  color: white;
`;

export const CTAContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

export const CTATitle = styled.h2`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 24px;
  color: white;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const CTADescription = styled.p`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
  line-height: 1.6;
`;

export const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
