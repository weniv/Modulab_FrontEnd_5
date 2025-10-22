interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

// 1.
type ProductWithoutId = Omit<Product, 'id'>;

//2.
type PartialProduct = Partial<Product>

//3.
type PickedProduct = Pick<Product, 'id'| 'name' | 'price'>