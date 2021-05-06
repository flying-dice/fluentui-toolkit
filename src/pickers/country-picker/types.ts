import { IPeoplePickerProps } from "@fluentui/react";

export type CountryPickerVariant = "Normal" | "List";

export type CountryPickerProps = Omit<IPeoplePickerProps, "onResolveSuggestions" | "onChange"> & {
  selectedCountries?: Country[];
  availableCountries: Country[];
  onChange?: (countries: Country[]) => void;
  variant?: CountryPickerVariant;
};

export type Country = {
  name: string;
  alpha3: string;
  alpha2: string;
  imageUrl: string;
};
