import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import Button from "../../components/Button/Button";
import * as S from "./styles";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: "📋",
      title: "Easy Application Process",
      description:
        "Streamlined visa application process with step-by-step guidance and document upload.",
    },
    {
      icon: "👥",
      title: "Multiple User Roles",
      description:
        "Support for individual applicants, corporate accounts, and administrative oversight.",
    },
    {
      icon: "📊",
      title: "Real-time Tracking",
      description:
        "Track your application status in real-time with instant updates and notifications.",
    },
  ];

  return (
    <S.HomePageContainer>
      <S.HeroSection>
        <S.HeroTitle>Streamline Your Visa Applications</S.HeroTitle>
        <S.HeroSubtitle>
          Manage athlete visa applications efficiently with our comprehensive
          platform designed for individuals, corporations, and administrators.
        </S.HeroSubtitle>
        <S.HeroButtons>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="large">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary" size="large">
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" size="large">
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </S.HeroButtons>
      </S.HeroSection>

      <S.FeaturesSection>
        <S.FeaturesContainer>
          <S.FeaturesTitle>Why Choose VisaPro?</S.FeaturesTitle>
          <S.FeaturesGrid>
            {features.map((feature, index) => (
              <S.FeatureCard key={index}>
                <S.FeatureIcon>{feature.icon}</S.FeatureIcon>
                <S.FeatureTitle>{feature.title}</S.FeatureTitle>
                <S.FeatureDescription>
                  {feature.description}
                </S.FeatureDescription>
              </S.FeatureCard>
            ))}
          </S.FeaturesGrid>
        </S.FeaturesContainer>
      </S.FeaturesSection>
    </S.HomePageContainer>
  );
};

export default HomePage;
