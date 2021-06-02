type Action = {
  type: string | any;
  payload?: Product | string | Array | any;
};

// Products
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
  page: number | string;
  pages: number | string;
  loading: boolean;
  error: string;
};

type ProductDispatch = (args: Action) => ProductState;

// ================================================

// Cart

interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: string;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

type CartState = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
};

type CartDispatch = (args: Action) => CartState;

// =================================================

// User Auth

interface UserInfo {
  refresh: string;
  access: string;
  id: number;
  _id: number;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

type UserState = {
  userInfo: UserInfo;
  loading: boolean;
  error: string;
};

type UserDispatch = (args: Action) => UserState;

// =======================================================

// User Details
interface UserDetails {
  id: number;
  _id: number;
  username: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

type UserDetailsState = {
  userDetails: UserDetails;
  loading: boolean;
  error: string;
};

type UserDetailsDispatch = (args: Action) => UserDetailsState;

// =================================

// Order Create
interface Order {
  orderItems: CartItem[] | [];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

type OrderCreateState = {
  loading: boolean;
  success: boolean;
  order: Order[] | [] | null;
  error: string;
};

type OrderCreateDispatch = (args: Action) => OrderCreateState;

// ============================================

interface OrderItems {
  _id: number;
  name: string;
  qty: number;
  price: string;
  image: string;
  product: number;
  order: number;
}
interface OrderDetail {
  _id: number;
  orderItems: OrderItems[] | [];
  shippingAddress: {
    _id: number;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    shippingPrice: string | null;
    order: number;
  };
  user: {
    id: number;
    _id: number;
    username: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  paymentMethod: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
}

type OrderDetailsState = {
  loading: boolean;
  paid: boolean;
  orderDetails: OrderDetail | null;
  error: string;
};

type OrderDetailsDispatch = (args: Action) => OrderDetailsState;

// =============================================

// User All Order List

type OrderListState = {
  loading: boolean;
  orders: OrderDetail[] | [];
  error: string;
};

type OrderListDispatch = (args: Action) => OrderListState;

// =================================================

// Users List

interface User {
  _id: 1;
  orderItems: OrderItems[];
  shippingAddress: {
    _id: number;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    shippingPrice: string | null;
    order: number;
  };
  user: UserDetails;
  paymentMethod: string;
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
}

type UserListState = {
  loading: boolean;
  users: User[] | [];
  error: string;
};

type UserListDispatch = (args: Action) => UserListState;

// ============================================

interface Review {
  _id: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  product: number;
  user: number;
}

type createProductReviewState = {
  loading: boolean;
  success: boolean;
  error: string;
};

type createProductReviewDispatch = (args: Action) => createProductReviewState;
