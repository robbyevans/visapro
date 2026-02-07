import React from 'react';
import { 
  HeroSection,
  HeroContent,
  HeroOverlay,
  HeroTitle,
  ContentSection,
  ServiceList, 
  ServiceItem, 
  ServiceImage, 
  ServiceContent,
  Description,
  ServiceContainer,
  Bullet,
  ServiceListItem,
  ServiceText
} from './styles';
import Footer from '../../components/Footer/Footer';
import image from '../../assets/aboutus.png';

interface Service {
  id: number;
  name: string;
  description: string;
}

const ServicePage: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      name: 'Tourist Visa Processing',
      description: 'Quick and efficient processing for short-term visits and tourism purposes.',
    },
    {
      id: 2,
      name: 'Work Visa Consultation',
      description: 'Expert guidance for professional athletes and workers seeking international opportunities.',
    },
    {
      id: 3,
      name: 'Document Verification',
      description: 'Thorough review and verification to ensure application success and compliance.',
    },
    {
      id: 4,
      name: 'Express Processing',
      description: 'Fast-track services for urgent applications with priority handling.',
    }
  ];

  const serviceFeatures = [
    'Visa application guidance and processing',
    'Document verification and preparation',
    'Country-specific requirement assistance',
    'Timeline management and updates',
    'Post-approval support'
  ];

  return (
    <>
      <HeroSection>
        <HeroOverlay/>
        <HeroContent>
          <HeroTitle>
            Our Services
          </HeroTitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Description>
          Our goal is to remove barriers between you and your global destinations through reliable,
          efficient, and personalized visa solutions. And as such, our end-to-end visa package addresses
          every aspect of your travel documentation ranging from:
        </Description> 

        <ServiceContainer>
          {serviceFeatures.map((feature,index) => (
            <ServiceListItem key={index}>
              <Bullet>●</Bullet>
              <ServiceText>{feature}</ServiceText>
            </ServiceListItem>
            ))}
        </ServiceContainer>

        <ServiceList>
          {services.map((service) => (
            <ServiceItem key={service.id}>
              <ServiceImage>
                <img 
                  src={image} 
                  alt={service.name} 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}} 
                />
              </ServiceImage>
              <ServiceContent>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </ServiceContent>
            </ServiceItem>
          ))}
        </ServiceList>
      </ContentSection>

      <Footer />
    </>
  );
};   
export default ServicePage;