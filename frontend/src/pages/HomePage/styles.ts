import styled from "styled-components";
import kenyanAthleteHero from "../../assets/openart-53b2916a2c7642d5a7ec6bfdf7aff19e_00001__raw.jpg";
import { STATIC_COLORS } from "../../styles";

export const HomePageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.primary};
  transition: background-color 0.3s ease;
`;

export const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 80px 0 40px;

  @media (min-width: 768px) {
    padding: 0;
    min-height: 100vh;
  }
`;

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Show background image only on desktop */
  @media (min-width: 768px) {
    background: url(${kenyanAthleteHero}) center/cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* Mobile gradient background */
  @media (max-width: 767px) {
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primaryColors["600"]} 0%,
      ${({ theme }) => theme.primaryColors["400"]} 50%,
      ${({ theme }) => theme.secondaryColors["500"]} 100%
    );
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    @media (min-width: 768px) {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(0px);
    }

    @media (max-width: 767px) {
      background: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  /* Desktop overlay */
  @media (min-width: 768px) {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.4) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }

  /* Mobile overlay - darker for better text contrast */
  @media (max-width: 767px) {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
  }
`;

export const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  text-align: center;
  padding: 50px 20px;
  z-index: 2;
  width: 100%;

  top: 0;
  left: 0;

  @media (min-width: 768px) {
    padding: 0 24px;
    max-width: 800px;
    top: 70px;
  }

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 2.5rem; /* 40px */
  font-weight: 800;
  color: ${STATIC_COLORS.base.white};
  margin-bottom: 1.5rem; /* 24px */
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  /* Glass effect only on desktop */
  @media (min-width: 768px) {
    font-size: 3.5rem; /* 56px */
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 20px;
    padding: 2rem 2.5rem; /* 32px 40px */
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1024px) {
    font-size: 4rem; /* 64px */
    padding: 1.875rem 2.5rem; /* 30px 40px */
  }

  /* Small mobile devices */
  @media (max-width: 360px) {
    font-size: 2rem; /* 32px */
    margin-bottom: 1rem; /* 16px */
  }
`;

export const HeroHighlight = styled.span`
  background: linear-gradient(
    135deg,
    ${STATIC_COLORS.base.white} 0%,
    ${({ theme }) => theme.primaryColors["200"]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;

  @media (max-width: 767px) {
    background: linear-gradient(
      135deg,
      ${STATIC_COLORS.base.white} 0%,
      ${({ theme }) => theme.primaryColors["300"]} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem; /* 18px */
  color: ${STATIC_COLORS.base.white};
  opacity: 0.95;
  margin-bottom: 3rem; /* 48px */
  line-height: 1.6;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    font-size: 1.25rem; /* 20px */
    padding: 0;
  }

  @media (max-width: 360px) {
    font-size: 1rem; /* 16px */
    margin-bottom: 2rem; /* 32px */
    padding: 0 0.5rem;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem; /* 16px */
  justify-content: center;
  margin-bottom: 4rem; /* 64px */
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 480px) {
    flex-direction: row;
    max-width: 400px;
  }

  @media (min-width: 768px) {
    margin-bottom: 5rem; /* 80px */
    max-width: none;
  }

  a {
    width: 100%;

    @media (min-width: 480px) {
      width: auto;
    }
  }

  button {
    width: 100%;

    @media (min-width: 480px) {
      width: auto;
      min-width: 180px;
    }
  }
`;

export const HeroStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem; /* 24px */
  max-width: 400px;
  margin: 0 auto;
  width: 100%;

  @media (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 600px;
    gap: 2rem; /* 32px */
  }

  @media (min-width: 768px) {
    gap: 2rem; /* 32px */
  }
`;

export const StatItem = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.25rem 0.75rem; /* 20px 12px */
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (min-width: 480px) {
    padding: 1rem; /* 16px */
  }

  @media (min-width: 768px) {
    padding: 1.25rem 1rem; /* 20px 16px */
  }
`;

export const StatNumber = styled.div`
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  color: ${STATIC_COLORS.base.white};
  margin-bottom: 0.5rem; /* 8px */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (min-width: 480px) {
    font-size: 1.75rem; /* 28px */
  }

  @media (min-width: 768px) {
    font-size: 2rem; /* 32px */
  }
`;

export const StatLabel = styled.div`
  font-size: 0.75rem; /* 12px */
  color: ${STATIC_COLORS.base.white};
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (min-width: 480px) {
    font-size: 0.875rem; /* 14px */
  }
`;

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
  color: ${({ theme }) => theme.secondaryColors["500"]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
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
  color: ${({ theme }) => theme.text.secondary};
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
  padding: 100px 0;
  background: ${({ theme }) => theme.background.primary};
  transition: background-color 0.3s ease;
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
  background: ${({ theme }) => theme.background.secondary};
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border.light};
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    background: ${({ theme }) => theme.background.primary};
    border-color: ${({ theme }) => theme.primaryColors["200"]};
  }

  @media (max-width: 1024px) {
    padding: 32px 20px;
    min-height: 200px;
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    min-height: auto;

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
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primaryColors["500"]},
    ${({ theme }) => theme.primaryColors["600"]}
  );
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.inverse};
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
  color: ${({ theme }) => theme.text.primary};
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
  color: ${({ theme }) => theme.text.secondary};
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
  background: ${({ theme }) => theme.background.secondary};
  transition: background-color 0.3s ease;
`;

export const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
`;

export const ProcessCard = styled.div`
  text-align: center;
  padding: 40px 24px;
  background: ${({ theme }) => theme.background.primary};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border.light};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.primaryColors["200"]};
  }
`;

export const ProcessStep = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.successColors["500"]},
    ${({ theme }) => theme.successColors["600"]}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.inverse};
  font-size: 20px;
  font-weight: 700;
`;

export const ProcessTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.primary};
`;

export const ProcessDescription = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.6;
  font-size: 14px;
`;

// CTA Section
export const CTASection = styled.section`
  padding: 120px 0;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.neutralColors["900"]} 0%,
    ${({ theme }) => theme.neutralColors["800"]} 100%
  );
  color: ${({ theme }) => theme.text.inverse};
  transition: background 0.3s ease;
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
  color: ${STATIC_COLORS.base.white};

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

export const CTADescription = styled.p`
  font-size: 20px;
  color: ${STATIC_COLORS.base.white};
  opacity: 0.8;
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
