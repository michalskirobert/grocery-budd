import * as uuid from "uuid";

export const initialGroceryHelper = [
  {
    id: uuid.v4(),
    name: "",
    namePlaceholder: "Insert the name",
    category: "Grocery,Vegetables",
    price: "0.00",
    currency: "PLN",
    isActive: true,
  },
];

export const languagesList = [
  { name: "English", language: "ENG" },
  { name: "Polski", language: "PL" },
  { name: "Bahasa", language: "BH" },
];

export const currenciesList = [
  { name: "Euro", currency: "EURO" },
  { name: "Złotówki", currency: "PLN" },
];
