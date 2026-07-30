import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

const initial = { items: [], isOpen: false };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, variant, quantity = 1 } = action.payload;
      const key = `${product.id}:${variant}`;
      const existing = state.items.find((i) => i.key === key);
      let items;
      if (existing) {
        items = state.items.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        items = [
          ...state.items,
          {
            key,
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            optionName: product.optionName || '',
            variant,
            quantity,
          },
        ];
      }
      return { ...state, items, isOpen: true };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.key !== action.payload.key) };
    case 'SET_QTY': {
      const items = state.items
        .map((i) =>
          i.key === action.payload.key ? { ...i, quantity: action.payload.quantity } : i
        )
        .filter((i) => i.quantity > 0);
      return { ...state, items };
    }
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial);

  const addItem = useCallback((product, variant, quantity = 1) => {
    dispatch({ type: 'ADD', payload: { product, variant, quantity } });
  }, []);
  const removeItem = useCallback((key) => dispatch({ type: 'REMOVE', payload: { key } }), []);
  const setQuantity = useCallback((key, quantity) =>
    dispatch({ type: 'SET_QTY', payload: { key, quantity } }), []);
  const openCart = useCallback(() => dispatch({ type: 'OPEN' }), []);
  const closeCart = useCallback(() => dispatch({ type: 'CLOSE' }), []);

  const count = useMemo(() => state.items.reduce((n, i) => n + i.quantity, 0), [state.items]);
  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({ items: state.items, isOpen: state.isOpen, count, subtotal, addItem, removeItem, setQuantity, openCart, closeCart }),
    [state.items, state.isOpen, count, subtotal, addItem, removeItem, setQuantity, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}