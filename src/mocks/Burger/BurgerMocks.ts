import { type BurgerStructure } from "../../app/features/burger/types";

export const classicBurgerMock: BurgerStructure = {
  name: "Classic Burger",
  price: 5,
  isOrdered: false,
  ingredients: ["Brioche buns", "Ham"],
  imageUrl: "/classicBurger.jpg",
  badges: [],
};

export const cheeseBurgerMock: BurgerStructure = {
  name: "Cheese Burger",
  price: 6,
  isOrdered: false,
  ingredients: ["Brioche buns", "Ham", "Cheese"],
  imageUrl: "/cheeseBurger.jpg",
  badges: [],
};

export const veganBurgerMock: BurgerStructure = {
  name: "Vegan Burger",
  price: 11,
  isOrdered: false,
  ingredients: ["Brioche buns", "Vegan Ham", "Cheese"],
  imageUrl: "/veganBurger.jpg",
  badges: ["Vegan"],
};

export const burgersMock = [classicBurgerMock, cheeseBurgerMock];
