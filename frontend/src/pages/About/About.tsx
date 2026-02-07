import React from 'react';
import * as S from './styles';
//   HeroSection, 
//   HeroOverlay,
//   HeroContent,
//   HeroTitle,
//   WhoWeAreSection,
//   WhoWeAreImage,
//   WhoWeAreContent,
//   WhoWeAreTitle,
//   WhoWeAreText,
//   MissionSection,
//   MissionContent,
//   MissionImage,
//   MissionTitle,
//   MissionText,
//   CTASection,
//   CTAContent,
//   CTATitle,
//   CTAText,
//   CTAButton
// } 
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import whoWeAreImage from '../../assets/aboutus.png'; 
import missionImage from '../../assets/aboutus.png'; 

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <S.HeroSection>
        <S.HeroOverlay />
        <S.HeroContent>
          <S.HeroTitle>About Us</S.HeroTitle>
        </S.HeroContent>
      </S.HeroSection>

      {/* Who We Are Section - Image on Left */}
      <S.WhoWeAreSection>
        <S.WhoWeAreImage>
          <img src={whoWeAreImage} alt="VisaLink Team" />
        </S.WhoWeAreImage>
        
        <S.WhoWeAreContent>
          <S.WhoWeAreTitle>WHO WE ARE</S.WhoWeAreTitle>
          
          <S.WhoWeAreText>
            <a href="https://visalink.io" target="_blank" rel="noopener noreferrer" style={{color: '#10b981', textDecoration: 'none'}}> Visalink.io </a> is a premier visa consultancy service under Athlinks Agency Limited. 
            We specialize in transforming the complex visa application process into a seamless, 
            stress-free experience for travelers worldwide. Our dedicated tech driven digital 
            platform is tailored to meet diverse corporates and individuals needs.
          </S.WhoWeAreText>
        </S.WhoWeAreContent>
      </S.WhoWeAreSection>

      
      <S.MissionSection>
        <S.MissionContent>
          <S.MissionTitle>OUR MISSION</S.MissionTitle>
          
          <S.MissionText>
            Our mission is to remove barriers between you and your global destinations through 
            reliable, efficient, and personalized visa solutions. {/*And as such, our end-to-end 
            visa package addresses every aspect of your travel documentation ranging from:*/}
          </S.MissionText>

        </S.MissionContent>

        <S.MissionImage>
          <img src={missionImage} alt="Our Mission" />
        </S.MissionImage>
      </S.MissionSection>

      {/* CTA Section */}
      <S.CTASection>
        <S.CTAContent>
          <S.CTATitle>Ready to Start Your Visa Journey?</S.CTATitle>
          <S.CTAText>
            Every day, we help athletes, students, and adventurers cross boundaries with 
            confidence and ease. Ready to begin your journey? Contact us today.
          </S.CTAText>
          <S.CTAButton onClick={() => navigate('/Quote')}>
            Book Appointment
          </S.CTAButton>
        </S.CTAContent>
      </S.CTASection>

      <Footer />
    </>
  );
};

export default About;