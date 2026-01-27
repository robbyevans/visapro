import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../redux/api';
import Footer from '../../components/Footer/Footer';
import { Container, Title, ServiceList, ServiceItem, LoadingSpinner } from './styles';

interface Service {
  id: number;
  name: string;
  description: string;
}

const ServicePage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance().get('/services');
      setServices(response.data);
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner>Loading services...</LoadingSpinner>;
  if (error) return <div style={{padding: '2rem', color: 'red'}}>Error: {error}</div>;

  return (
    <>
      <Container>
        <Title>Services</Title>
        <ServiceList>
          {services.map((service) => (
            <ServiceItem key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </ServiceItem>
          ))}
        </ServiceList>
      </Container>
      <Footer />
    </>
  );
};

export default ServicePage;