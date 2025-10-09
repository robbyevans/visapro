import { Country, State, City } from "react-country-state-city";
import {
  ICountry,
  IState,
  ICity,
} from "react-country-state-city/dist/interface";

// Helper function to get all countries with flags
export const getAllCountries = async (): Promise<ICountry[]> => {
  return new Promise((resolve, reject) => {
    Country.getAllCountries()
      .then((countries) => {
        resolve(countries);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        reject(error);
      });
  });
};

// Helper function to get country by code
export const getCountryByCode = async (
  code: string
): Promise<ICountry | null> => {
  const countries = await getAllCountries();
  return countries.find((country) => country.isoCode === code) || null;
};

// Get states for a country
export const getStatesByCountry = async (
  countryCode: string
): Promise<IState[]> => {
  return new Promise((resolve, reject) => {
    State.getStatesOfCountry(countryCode)
      .then((states) => {
        resolve(states);
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
        reject(error);
      });
  });
};

// Get cities for a state
export const getCitiesByState = async (
  countryCode: string,
  stateCode: string
): Promise<ICity[]> => {
  return new Promise((resolve, reject) => {
    City.getCitiesOfState(countryCode, stateCode)
      .then((cities) => {
        resolve(cities);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        reject(error);
      });
  });
};

// Format country for select dropdown
export const formatCountryForSelect = (country: ICountry) => ({
  value: country.isoCode,
  label: `${country.name}`,
  flag: country.flag, // This provides the emoji flag
  phoneCode: country.phonecode,
});

// Get popular countries (commonly used in visa applications)
export const getPopularCountries = async (): Promise<ICountry[]> => {
  const allCountries = await getAllCountries();
  const popularCountryCodes = [
    "US",
    "GB",
    "CA",
    "AU",
    "DE",
    "FR",
    "IT",
    "ES",
    "JP",
    "CN",
    "IN",
    "BR",
    "MX",
    "ZA",
    "AE",
    "SG",
  ];

  return allCountries
    .filter((country) => popularCountryCodes.includes(country.isoCode))
    .sort(
      (a, b) =>
        popularCountryCodes.indexOf(a.isoCode) -
        popularCountryCodes.indexOf(b.isoCode)
    );
};
