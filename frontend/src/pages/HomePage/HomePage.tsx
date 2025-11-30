import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";
import Logo001 from "../../assets/logo001.png";
import Logo002 from "../../assets/logo002.png";
import Logo003 from "../../assets/logo003.png";
import Logo004 from "../../assets/logo004.png";
import Logo005 from "../../assets/logo005.png";
import CompaniesSection from "../../components/CompaniesSection/CompaniesSection";
import * as S from "./styles";
import { STATIC_COLORS } from "../../styles";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

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

  const customCompanies = [
    {
      id: "1",
      name: "Peez management sports",
      logo: Logo001,
      website: "https://www.peezsports.com",
    },
    {
      id: "2",
      name: "Todorovic Sports",
      logo: Logo002,
      website: "https://www.todorovic.co.rs/",
    },
    {
      id: "3",
      name: "Li-Ning",
      logo: Logo003,
      website: "https://www.li-ning.com/",
    },
    {
      id: "4",
      name: "Posso Sports",
      logo: Logo004,
      website: "https://possosports.com/",
    },
    {
      id: "5",
      name: "Xtep",
      logo: Logo005,
      website: "https://www.globalxtep.com/",
    },
  ];

  return (
    <S.HomePageContainer>
      <S.HeroSection>
        <S.HeroBackground>
          <S.HeroOverlay />
          <S.HeroContent>
            <S.HeroTitle>
              <S.HeroHighlight>Athlinks Visa Center</S.HeroHighlight> Fueling
              Athletes Across the Globe
            </S.HeroTitle>

            <S.HeroSubtitle>
              Streamline your international visa applications with our dedicated
              platform designed specifically for athletes, coaches, and sports
              organizations. Fast-track your journey to global competitions.
            </S.HeroSubtitle>
            <S.HeroButtons>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button
                    textColor={STATIC_COLORS.base.white}
                    variant="primary"
                    size="lg"
                    pulsating
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="primary" size="lg" pulsating>
                      Start Your Journey
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

      <CompaniesSection companies={customCompanies} />

      {/* Footer */}
      <Footer />
    </S.HomePageContainer>
  );
};

export default HomePage;
