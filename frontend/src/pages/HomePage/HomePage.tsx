import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import * as S from "./styles";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: "⚡",
      title: "Lightning-Fast Processing",
      description:
        "Accelerated visa processing designed for athletes and sports professionals with urgent travel needs.",
    },
    {
      icon: "🌍",
      title: "Global Competition Ready",
      description:
        "Seamlessly apply for visas to compete in international tournaments and championships worldwide.",
    },
    {
      icon: "📱",
      title: "Mobile-First Design",
      description:
        "Manage your applications on the go with our responsive platform that works perfectly on any device.",
    },
    {
      icon: "🔒",
      title: "Secure & Confidential",
      description:
        "Military-grade encryption ensures your personal and professional data remains completely secure.",
    },
    {
      icon: "🔄",
      title: "Real-Time Updates",
      description:
        "Instant notifications and status updates so you never miss important application milestones.",
    },
    {
      icon: "👥",
      title: "Team Management",
      description:
        "Corporate accounts can manage multiple athletes and team members under one organization.",
    },
  ];

  const stats = [
    { number: "500+", label: "Athletes Served" },
    { number: "95%", label: "Approval Rate" },
    { number: "24h", label: "Average Processing" },
    { number: "50+", label: "Countries Covered" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Create Account",
      description:
        "Sign up as an individual athlete or corporate organization managing multiple athletes.",
    },
    {
      step: "02",
      title: "Submit Application",
      description:
        "Fill out the streamlined application form and upload required documents securely.",
    },
    {
      step: "03",
      title: "Track Progress",
      description:
        "Monitor your application status in real-time with detailed progress updates.",
    },
    {
      step: "04",
      title: "Receive Visa",
      description:
        "Get your approved visa digitally or prepare for embassy collection as required.",
    },
  ];

  return (
    <S.HomePageContainer>
      {/* Hero Section with Kenyan Athletic Theme */}
      <S.HeroSection>
        <S.HeroBackground>
          <S.HeroOverlay />
          <S.HeroContent>
            <S.HeroTitle>
              Empowering <S.HeroHighlight>Kenyan Athletes</S.HeroHighlight>{" "}
              Worldwide
            </S.HeroTitle>
            <S.HeroSubtitle>
              Streamline your international visa applications with our dedicated
              platform designed specifically for athletes, coaches, and sports
              organizations. Fast-track your journey to global competitions.
            </S.HeroSubtitle>
            <S.HeroButtons>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button variant="primary" size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="primary" size="lg">
                      Start Your Journey
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary" size="lg">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </S.HeroButtons>
            <S.HeroStats>
              {stats.map((stat, index) => (
                <S.StatItem key={index}>
                  <S.StatNumber>{stat.number}</S.StatNumber>
                  <S.StatLabel>{stat.label}</S.StatLabel>
                </S.StatItem>
              ))}
            </S.HeroStats>
          </S.HeroContent>
        </S.HeroBackground>
      </S.HeroSection>

      {/* Features Section */}
      <S.FeaturesSection>
        <S.SectionContainer>
          <S.SectionHeader>
            <S.SectionPreTitle>Why Choose AthleteVisa Pro</S.SectionPreTitle>
            <S.SectionTitle>
              Built for the World's Finest Athletes
            </S.SectionTitle>
            <S.SectionSubtitle>
              Our platform is specifically designed to meet the unique needs of
              athletes and sports professionals navigating international travel
              requirements.
            </S.SectionSubtitle>
          </S.SectionHeader>
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
        </S.SectionContainer>
      </S.FeaturesSection>

      {/* Process Section */}
      <S.ProcessSection>
        <S.SectionContainer>
          <S.SectionHeader>
            <S.SectionPreTitle>How It Works</S.SectionPreTitle>
            <S.SectionTitle>Simple 4-Step Process</S.SectionTitle>
            <S.SectionSubtitle>
              From application to approval, we've streamlined the entire visa
              process for athletes and sports professionals.
            </S.SectionSubtitle>
          </S.SectionHeader>
          <S.ProcessGrid>
            {processSteps.map((step, index) => (
              <S.ProcessCard key={index}>
                <S.ProcessStep>{step.step}</S.ProcessStep>
                <S.ProcessTitle>{step.title}</S.ProcessTitle>
                <S.ProcessDescription>{step.description}</S.ProcessDescription>
              </S.ProcessCard>
            ))}
          </S.ProcessGrid>
        </S.SectionContainer>
      </S.ProcessSection>

      {/* CTA Section */}
      <S.CTASection>
        <S.SectionContainer>
          <S.CTAContent>
            <S.CTATitle>Ready to Start Your Journey?</S.CTATitle>
            <S.CTADescription>
              Join hundreds of Kenyan athletes who trust us with their
              international visa applications. Focus on your training while we
              handle the paperwork.
            </S.CTADescription>
            <S.CTAButtons>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button variant="primary" size="lg">
                    Create Free Account
                  </Button>
                </Link>
              )}
              <Link to="/login">
                <Button
                  variant={isAuthenticated ? "primary" : "secondary"}
                  size="lg"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Sign In"}
                </Button>
              </Link>
            </S.CTAButtons>
          </S.CTAContent>
        </S.SectionContainer>
      </S.CTASection>

      {/* Footer */}
      <Footer />
    </S.HomePageContainer>
  );
};

export default HomePage;
