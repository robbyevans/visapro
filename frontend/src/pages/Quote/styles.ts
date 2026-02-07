import styled from 'styled-components';
import heroImage from '../../assets/aboutus.png';

export const QuoteContainer = styled.div`
  min-height: 100vh;
`;

// Hero Section
export const QuoteHero = styled.section`
  position: relative;
  height: 200px;
  background-image: url(${heroImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.9));
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 2rem;
  max-width: 800px;
`;

export const HeroTitle = styled.h1`
  color: #ffffff;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  color: #ffffff;
  font-size: 1.2rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Introduction Section
export const IntroSection = styled.section`
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;
  text-align: center;

  @media (max-width: 768px) {
    margin: 3rem auto;
  }
`;

export const IntroText = styled.p`
  color: #475569;
  font-size: 1.15rem;
  line-height: 1.8;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Quick Quote Section
export const QuickQuoteSection = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin: 3rem auto;
  }
`;

export const SectionTitle = styled.h2`
  color: #10b981;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

export const QuoteOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const QuoteOption = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
    border-color: #10b981;
  }
`;

export const OptionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const OptionTitle = styled.h3`
  color: #10b981;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const OptionDetails = styled.div`
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;

  p {
    margin: 0.5rem 0;
  }
`;

export const OptionLink = styled.a`
  color: #10b981;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  display: inline-block;
  margin: 0.5rem 0;
  transition: color 0.3s ease;

  &:hover {
    color: #059669;
    text-decoration: underline;
  }
`;

// Form Section
export const FormSection = styled.section`
  max-width: 900px;
  margin: 4rem auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin: 3rem auto;
  }
`;

export const FormContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const FormTitle = styled.h2`
  color: #10b981;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

export const FormDescription = styled.p`
  color: #64748b;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  // color: #1e293b;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SubmitButton = styled.button`
  background: #10b981;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(16, 185, 129, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: #f0fdf4;
  border-radius: 12px;
  border: 2px solid #10b981;

  h3 {
    color: #10b981;
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  p {
    color: #059669;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;