export class Cart {
   items : CartItem[]
}


export class CartItem {
      productid ?: string;
      qty ?: number
}


export class CartItemDetailed {
      product?: any;
      qty?: number;
    }
    