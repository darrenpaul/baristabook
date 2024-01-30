const lightRoasts = [
  { label: "Light City", value: "Light City" },
  { label: "Half City", value: "Half City" },
  { label: "Cinnamon", value: "Cinnamon" },
];

const mediumRoasts = [
  { label: "City", value: "City" },
  { label: "American", value: "American" },
  { label: "Breakfast", value: "Breakfast" },
];

const mediumDarkRoasts = [{ label: "Full City", value: "Full City" }];

const darkRoasts = [
  { label: "High", value: "High" },
  { label: "Continental", value: "Continental" },
  { label: "New Orleans", value: "New Orleans" },
  { label: "European", value: "European" },
  { label: "Espresso", value: "Espresso" },
  { label: "Viennese", value: "Viennese" },
  { label: "Italian", value: "Italian" },
  { label: "French", value: "French" },
];

export const coffeeRoasts = [
  ...lightRoasts,
  ...mediumRoasts,
  ...mediumDarkRoasts,
  ...darkRoasts,
];
