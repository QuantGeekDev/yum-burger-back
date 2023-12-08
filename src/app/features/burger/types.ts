export interface BurgerStructure {
  name: string;
  price: number;
  imageUrl: string;
  ingredients: string[];
  isOrdered: boolean;
  badges: string[];
}

export interface BurgerFromMongooseStructure extends BurgerStructure {
  _id: string;
}
