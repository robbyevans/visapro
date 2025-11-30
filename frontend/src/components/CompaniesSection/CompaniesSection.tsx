import React from "react";
import * as S from "./styles";

interface Company {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface CompaniesSectionProps {
  companies?: Company[];
}

const CompaniesSection: React.FC<CompaniesSectionProps> = ({
  companies = defaultCompanies,
}) => {
  return (
    <S.CompaniesSection>
      <S.SectionContainer>
        <S.SectionHeader>
          <S.SectionPreTitle>Trusted Partnerships</S.SectionPreTitle>
          <S.SectionTitle>Working with Champions</S.SectionTitle>
          <S.SectionSubtitle>
            We're proud to partner with leading sports organizations, teams, and
            federations worldwide to support athletes in their international
            journeys.
          </S.SectionSubtitle>
        </S.SectionHeader>

        <S.CompaniesGrid>
          {companies.map((company) => (
            <S.CompanyLogoContainer key={company.id} title={company.name}>
              {company.website ? (
                <S.CompanyLink
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <S.CompanyLogo
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                  />
                </S.CompanyLink>
              ) : (
                <S.CompanyLogo
                  src={company.logo}
                  alt={company.name}
                  loading="lazy"
                />
              )}
            </S.CompanyLogoContainer>
          ))}
        </S.CompaniesGrid>
      </S.SectionContainer>
    </S.CompaniesSection>
  );
};

// Default companies data - replace with actual company logos
const defaultCompanies: Company[] = [
  {
    id: "1",
    name: "Sports Federation 1",
    logo: "/images/companies/company1.png",
    website: "https://example.com",
  },
  {
    id: "2",
    name: "Athletic Association",
    logo: "/images/companies/company2.png",
    website: "https://example.com",
  },
  {
    id: "3",
    name: "Global Sports Org",
    logo: "/images/companies/company3.png",
  },
  {
    id: "4",
    name: "Team Champions",
    logo: "/images/companies/company4.png",
    website: "https://example.com",
  },
  {
    id: "5",
    name: "Elite Performance",
    logo: "/images/companies/company5.png",
  },
  {
    id: "6",
    name: "International Federation",
    logo: "/images/companies/company6.png",
    website: "https://example.com",
  },
];

export default CompaniesSection;
