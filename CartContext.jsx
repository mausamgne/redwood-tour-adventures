import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ================= PRICE ENGINE ================= */
  const calculateItemTotal = (item) => {
    if (!item || !item.vehicle || !item.vehicle.allpricerange) {
      return 0;
    }

    const guests = Number(item.quantity || 1);
    const vehicle = item.vehicle;

    const matched = vehicle.allpricerange.find((range) => {
      const from = Number(range.seats_from);
      const to = Number(range.seats_to);
      return guests >= from && guests <= to;
    });

    if (!matched) return 0;

    return Number(matched.price || 0);
  };

  /* ================= ADD TO CART ================= */
  const addToCart = (newItem) => {
  // 🔥 AUTO FIX TITLE HERE
  const updatedItem = {
    ...newItem,
    title: newItem.vehicle?.name
      ? `${newItem.vehicle.name} Tour`
      : newItem.title,
  };

  setCartItems((prev) => {
    const existing = prev.find(
      (item) =>
        item.title === updatedItem.title &&
        item.date === updatedItem.date &&
        item.vehicle?.id === updatedItem.vehicle?.id
    );

    if (existing) {
      return prev.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: updatedItem.quantity }
          : item
      );
    }

    return [...prev, updatedItem];
  });
};

  /* ================= REMOVE ================= */
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  /* ================= UPDATE QUANTITY ================= */
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const max = Number(item.vehicle?.max_passengers) || 7;

        return {
          ...item,
          quantity: Math.max(1, Math.min(quantity, max)),
        };
      })
    );
  };

  /* ================= CLEAR CART (🔥 NEW FIX) ================= */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  /* ================= SUMMARY ================= */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );

  const taxAmount = 0;
  const grandTotal = subtotal + taxAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateItemTotal,
        subtotal,
        taxAmount,
        grandTotal,
        clearCart, // ✅ IMPORTANT ADD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);