export interface IProducts {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  id: number;
  price: number;
  images: Array<string>;
  rating: number;
  title: string;
  quantity:number
}

