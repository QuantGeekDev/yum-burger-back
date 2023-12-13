import {
  type BurgerFromMongooseStructure,
  type BurgerStructure,
} from "../types";

export const classicBurgerMock: BurgerStructure = {
  name: "Classic Burger",
  price: 5,
  isOrdered: false,
  ingredients: "Brioche buns,  ham",
  imageUrl:
    "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
  isVegan: false,
  hasGluten: true,
};

export const cheeseBurgerMock: BurgerStructure = {
  name: "Cheese Burger",
  price: 6,
  isOrdered: false,
  ingredients: "Brioche buns,  ham,  cheese",
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  isVegan: false,
  hasGluten: true,
};

export const veganBurgerMock: BurgerStructure = {
  name: "Vegan Burger",
  price: 11,
  isOrdered: false,
  ingredients: "Brioche buns, vegan ham, vegan cheese",
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  isVegan: false,
  hasGluten: true,
};

export const burgersMock = [classicBurgerMock, cheeseBurgerMock];

export const burgersMockWithoutClassicBurger = [cheeseBurgerMock];

export const classicBurgerFromDbMock: BurgerFromMongooseStructure = {
  _id: "6567d60e9fbd027bb1696969",
  name: "Classic Burger",
  price: 5,
  isOrdered: false,
  ingredients: "Brioche buns, vegan ham, vegan cheese",
  imageUrl:
    "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
  isVegan: false,
  hasGluten: true,
};

export const cheeseBurgerFromDbMock: BurgerFromMongooseStructure = {
  _id: "6567d60e9fbd027bb1d9d722",
  name: "Cheese Burger",
  price: 6,
  isOrdered: false,
  ingredients: "Brioche buns, vegan ham, vegan cheese",
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  isVegan: false,
  hasGluten: true,
};

export const veganBurgerFromDbMock: BurgerFromMongooseStructure = {
  _id: "6567d60e9fbd027bb1d9d110",
  name: "Vegan Burger",
  price: 11,
  isOrdered: false,
  ingredients: "Brioche buns, vegan ham, vegan cheese",
  imageUrl:
    "https://i.ibb.co/nMhsNVJ/rice-burger-with-salmon-cutlet-avocado-and-soy-sa-2021-12-09-07-32-56-utc.jpg",
  isVegan: true,
  hasGluten: true,
};

export const burgersFromDbMock = [
  classicBurgerFromDbMock,
  cheeseBurgerFromDbMock,
];

export const burgersFromDbMockWithoutClassicBurger = [cheeseBurgerFromDbMock];
