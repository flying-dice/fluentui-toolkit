export type CountryPickerProps = {
  selectedCountries?: Country[];
  availableCountries: Country[];
  onChange?: (countries: Country[]) => void;
};

export type Country = {
  name: string;
  alpha3: string;
  alpha2: string;
  imageUrl: string;
};
