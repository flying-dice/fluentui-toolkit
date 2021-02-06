import { CountryPicker } from "../CountryPicker";
import { useState } from "react";
import { differenceBy, mapValues } from "lodash";
import { getAlpha3Codes, getName, registerLocale } from "i18n-iso-countries";
registerLocale(require("i18n-iso-countries/langs/en.json"));

const availableCountries = Object.values(
  mapValues(getAlpha3Codes(), (alpha2, alpha3) => ({
    name: getName(alpha3, "en", { select: "official" }),
    alpha2,
    alpha3,
    imageUrl: `${process.env.PUBLIC_URL}/static/flags/round/${alpha3}.svg`,
  }))
);

export const ExampleCountryPicker = () => {
  const [ac, setAc] = useState(availableCountries.slice(2));
  const [sc, setSc] = useState(availableCountries.slice(0, 2));

  const handleChange = (newSelection) => {
    const allCountries = [...sc, ...ac];
    setAc(differenceBy(allCountries, newSelection, "alpha2"));
    setSc(newSelection);
  };

  return (
    <CountryPicker
      selectedCountries={sc}
      availableCountries={ac}
      onChange={handleChange}
    />
  );
};
