import React from 'react';
import { 
  HeroSection, 
  HeroOverlay,
  HeroContent,
  HeroTitle,
  MainContent,
  ContentGrid,
  Section,
  SectionTitle,
  SectionText,
  CTASection,
  CTAContent,
  CTATitle,
  CTAText,
  CTAButton
} from './styles';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section with Background Image */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>About Us</HeroTitle>
        </HeroContent>
      </HeroSection>

      {/* Middle Section - Main Content */}
      <MainContent>
        <ContentGrid>
          <Section>
            <SectionTitle>What We Do</SectionTitle>
            <SectionText>
              We specialize in comprehensive visa application management for international athletes, 
              offering end-to-end support from initial consultation and document preparation 
              to application submission and status tracking. Our platform streamlines the 
              complex visa process, allowing athletes to focus on their performance.
            </SectionText>
          </Section>

          <Section>
            <SectionTitle>Our Mission</SectionTitle>
            <SectionText>
              VisaLink is dedicated to simplifying the visa application process for athletes 
              and sports professionals worldwide. We bridge the gap between athletic talent 
              and international opportunities by providing seamless visa management services.
            </SectionText>
          </Section>

          <Section>
            <SectionTitle>Why Choose VisaLink?</SectionTitle>
            <SectionText>
              With years of experience in athlete visa management, we understand the unique 
              challenges faced by sports professionals. Our dedicated team provides personalized 
              support, ensuring each application meets the highest standards. We've successfully 
              processed thousands of visa applications, helping athletes compete and train globally.
            </SectionText>
          </Section>
        </ContentGrid>
      </MainContent>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Start Your Visa Journey?</CTATitle>
          <CTAText>
            Join hundreds of Kenyan athletes who trust us with their international visa applications. 
            Focus on your training while we handle the paperwork.
          </CTAText>
          <CTAButton onClick={() => navigate('/login')}>
            Get Started Today
          </CTAButton>
        </CTAContent>
      </CTASection>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default About;