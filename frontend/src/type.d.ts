interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

type ProductState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: string;
};

type ProductAction = {
  type: string | any;
  payload?: Product | string | Array | any;
};

type ProductDispatch = (args: ProductAction) => ProductState;
