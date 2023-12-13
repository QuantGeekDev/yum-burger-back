import { Schema, model } from "mongoose";

const burgerSchema = new Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  imageUrl: { type: String, require: true },
  calories: { type: Number, require: true },
  ingredients: { type: String, require: true },
  isOrdered: { type: Boolean, require: true },
  isVegan: { type: Boolean, require: false },
  hasGluten: { type: Boolean, require: false },
});

const Burger = model("Burger", burgerSchema, "burgers");

export default Burger;
