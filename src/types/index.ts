// Product type used throughout the app
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Cart item extends product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// API response shape from dummyjson.com
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export interface ApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}
