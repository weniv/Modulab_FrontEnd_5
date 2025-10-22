interface Product {
  id: number;
  name: string;
  price: number;
  description_?: string;
  category_?: string;
}

// 1.
type ReadonlyProduct<T> = {
   readonly [P in keyof T]: T[P];
}

// 2.
type RequiredProduct<T> = {
    [P in keyof T]-?: T[P];
}