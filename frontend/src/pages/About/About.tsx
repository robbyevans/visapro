import React from 'react';
import { 
  HeroSection, 
  HeroOverlay,
  HeroContent,
  HeroTitle,
  WhoWeAreSection,
  WhoWeAreImage,
  WhoWeAreContent,
  WhoWeAreTitle,
  WhoWeAreText,
  MissionSection,
  MissionContent,
  MissionImage,
  MissionTitle,
  MissionText,
  CTASection,
  CTAContent,
  CTATitle,
  CTAText,
  CTAButton
} from './styles';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import whoWeAreImage from '../../assets/aboutus.png'; 
import missionImage from '../../assets/aboutus.png'; 

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>About Us</HeroTitle>
        </HeroContent>
      </HeroSection>

      {/* Who We Are Section - Image on Left */}
      <WhoWeAreSection>
        <WhoWeAreImage>
          <img src={whoWeAreImage} alt="VisaLink Team" />
        </WhoWeAreImage>
        
        <WhoWeAreContent>
          <WhoWeAreTitle>WHO WE ARE</WhoWeAreTitle>
          
          <WhoWeAreText>
            <a href="https://visalink.io" target="_blank" rel="noopener noreferrer" style={{color: '#10b981', textDecoration: 'none'}}> Visalink.io </a> is a premier visa consultancy service under Athlinks Agency Limited. 
            We specialize in transforming the complex visa application process into a seamless, 
            stress-free experience for travelers worldwide. Our dedicated tech driven digital 
            platform is tailored to meet diverse corporates and individuals needs.
          </WhoWeAreText>
        </WhoWeAreContent>
      </WhoWeAreSection>

      
      <MissionSection>
        <MissionContent>
          <MissionTitle>OUR MISSION</MissionTitle>
          
          <MissionText>
            Our mission is to remove barriers between you and your global destinations through 
            reliable, efficient, and personalized visa solutions. {/*And as such, our end-to-end 
            visa package addresses every aspect of your travel documentation ranging from:*/}
          </MissionText>

          {/*<ServiceList>
            <ServiceItem>● Visa application guidance and processing</ServiceItem>
            <ServiceItem>● Document verification and preparation</ServiceItem>
            <ServiceItem>● Country-specific requirement assistance</ServiceItem>
            <ServiceItem>● Timeline management and updates</ServiceItem>
            <ServiceItem>● Post-approval support</ServiceItem>
          </ServiceList>*/}
        </MissionContent>

        <MissionImage>
          <img src={missionImage} alt="Our Mission" />
        </MissionImage>
      </MissionSection>

      {/* CTA Section */}
      <CTASection>
        <CTAContent>
          <CTATitle>Ready to Start Your Visa Journey?</CTATitle>
          <CTAText>
            Every day, we help athletes, students, and adventurers cross boundaries with 
            confidence and ease. Ready to begin your journey? Contact us today.
          </CTAText>
          <CTAButton onClick={() => navigate('/Quote')}>
            Book Appointment
          </CTAButton>
        </CTAContent>
      </CTASection>

      <Footer />
    </>
  );
};

export default About;