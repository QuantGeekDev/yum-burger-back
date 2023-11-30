import { Schema, model } from "mongoose";

const burgerSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  imageUrl: { type: String, require: true },
  ingredients: { type: Array<string>, require: true },
  isOrdered: { type: Boolean, require: true },
  badges: { type: Array<string>, require: false },
});

const Burger = model("Burger", burgerSchema, "burgers");

export default Burger;
