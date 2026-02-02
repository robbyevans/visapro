import React, { useState } from 'react';
import {
  QuoteContainer,
  QuoteHero,
  HeroOverlay,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  IntroSection,
  IntroText,
  QuickQuoteSection,
  SectionTitle,
  QuoteOptionsGrid,
  QuoteOption,
  OptionIcon,
  OptionTitle,
  OptionDetails,
  OptionLink,
  FormSection,
  FormContainer,
  FormTitle,
  FormDescription,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  SubmitButton,
  SuccessMessage
} from './styles';
import Footer from '../../components/Footer/Footer';
// import { useNavigate } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  destination: string;
  visaType: string;
  travelDate: string;
  duration: string;
  message: string;
}

const GetQuote: React.FC = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    destination: '',
    visaType: '',
    travelDate: '',
    duration: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          nationality: '',
          destination: '',
          visaType: '',
          travelDate: '',
          duration: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <QuoteContainer>
        {/* Hero Section */}
        <QuoteHero>
          <HeroOverlay />
          <HeroContent>
            <HeroTitle>Get Quote</HeroTitle>
            <HeroSubtitle>
              Customized visa solutions tailored to your needs
            </HeroSubtitle>
          </HeroContent>
        </QuoteHero>

        {/* Introduction */}
        <IntroSection>
          <IntroText>
            Every traveler's needs are unique, and therefore we analyze specific requirements 
            to provide the most accurate solution. We break down all costs clearly through a 
            customized quote so you know exactly what you are paying for.
          </IntroText>
        </IntroSection>

        {/* Quick Quote Options */}
        <QuickQuoteSection>
          <SectionTitle>Quick Quote Options</SectionTitle>
          
          <QuoteOptionsGrid>
            {/* Phone Consultation */}
            <QuoteOption>
              <OptionIcon>📞</OptionIcon>
              <OptionTitle>Phone Consultation</OptionTitle>
              <OptionDetails>
                <p>Call us at</p>
                <OptionLink href="tel:+254700000000">0745906338</OptionLink>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Available Monday to Friday<br />
                  8:30 AM - 5:00 PM
                </p>
              </OptionDetails>
            </QuoteOption>

            {/* Email Inquiry */}
            <QuoteOption>
              <OptionIcon>📧</OptionIcon>
              <OptionTitle>Email Inquiry</OptionTitle>
              <OptionDetails>
                <p>Send details to</p>
                <OptionLink href="mailto:quotes@visalink.io">
                  quotes@visalink.io
                </OptionLink>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Include your destination,<br />
                  travel dates, and visa type
                </p>
              </OptionDetails>
            </QuoteOption>

            {/* Visit Us */}
            <QuoteOption>
              <OptionIcon>📍</OptionIcon>
              <OptionTitle>Visit Us</OptionTitle>
              <OptionDetails>
                <p>Mango House Iten<br />Basement Room 3</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Monday - Friday<br />
                  8:30 AM - 5:00 PM
                </p>
              </OptionDetails>
            </QuoteOption>

            {/* WhatsApp Chatbot */}
            <QuoteOption>
              <OptionIcon>💬</OptionIcon>
              <OptionTitle>WhatsApp Chatbot</OptionTitle>
              <OptionDetails>
                <p>Use our WhatsApp chat bot<br />for a quick response</p>
                <OptionLink 
                  href="https://wa.me/254745906338" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Start Chat
                </OptionLink>
              </OptionDetails>
            </QuoteOption>
          </QuoteOptionsGrid>
        </QuickQuoteSection>

        {/* Online Quote Form */}
        <FormSection>
          <FormContainer>
            <FormTitle>Request a Detailed Quote Online</FormTitle>
            <FormDescription>
              Fill out the form below and we'll get back to you within 24 hours with a customized quote.
            </FormDescription>

            {submitted ? (
              <SuccessMessage>
                <h3>✓ Quote Request Submitted!</h3>
                <p>Thank you for choosing VisaLink. Our team will contact you within 24 hours with your customized quote.</p>
              </SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+254 700 000 000"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="destination">Destination Country *</Label>
                    <Select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select destination</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Schengen">Schengen Area</option>
                      <option value="Australia">Australia</option>
                      <option value="China">China</option>
                      <option value="Dubai">Dubai (UAE)</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="travelDate">Intended Travel Date *</Label>
                    <Input
                      type="date"
                      id="travelDate"
                      name="travelDate"
                      value={formData.travelDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>

                  </FormRow>

                <FormGroup>
                  <Label htmlFor="message">Additional Information</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us more about your travel plans, special requirements, or any questions you have..."
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Get My Quote'}
                </SubmitButton>
              </Form>
            )}
          </FormContainer>
        </FormSection>
      </QuoteContainer>

      <Footer />
    </>
  );
};

export default GetQuote;