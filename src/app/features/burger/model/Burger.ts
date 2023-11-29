import { Schema, model } from "mongoose";
import { type BurgerStructure } from "../types.js";

const ingredientsSchema = new Schema({
  ingredients: { Array, default: [] },
});

const badgesSchema = new Schema({
  badges: { Array, default: [] },
});

const burgerSchema = new Schema<BurgerStructure>({
  name: { type: String, require: true, unique: true },
  price: { type: Number, require: true },
  imageUrl: { type: String, require: true },
  ingredients: [ingredientsSchema],
  isOrdered: { type: Boolean, require: true },
  badges: { badgesSchema },
});

const Burger = model("Burger", burgerSchema, "burgers");

export default Burger;
