import { type BurgerStructure } from "../types";

export const classicBurgerMock: BurgerStructure = {
  name: "Classic Burger",
  price: 5,
  isOrdered: false,
  ingredients: ["Brioche buns", "Ham"],
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  badges: [],
};

export const cheeseBurgerMock: BurgerStructure = {
  name: "Cheese Burger",
  price: 6,
  isOrdered: false,
  ingredients: ["Brioche buns", "Ham", "Cheese"],
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  badges: [],
};

export const veganBurgerMock: BurgerStructure = {
  name: "Vegan Burger",
  price: 11,
  isOrdered: false,
  ingredients: ["Brioche buns", "Vegan Ham", "Cheese"],
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  badges: ["Vegan"],
};

export const burgersMock = [classicBurgerMock, cheeseBurgerMock];
