export type CartItem = {
  id: string;
  quantity: number;
};

export type CartContextValue = {
  items: CartItem[];
  add: (id: string) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  has: (id: string) => boolean;
  quantity: (id: string) => number;
  count: number;
  totalQuantity: number;
  mounted: boolean;
};
