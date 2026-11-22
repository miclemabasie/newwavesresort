import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MENU_CART_STORAGE_KEY,
  MenuCartContext,
  getMenuCartKey,
  loadStoredMenuCart,
} from './menuCartHelpers';

export function MenuCartProvider({ children }) {
  const [cart, setCart] = useState(loadStoredMenuCart);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(MENU_CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota or private browsing errors
    }
  }, [cart]);

  const addItem = useCallback((dish, meta = {}) => {
    if (!dish || !dish.menu_item_id) return;
    const key = getMenuCartKey(dish.menu_item_id, dish.daily_menu_entry_id);

    setCart((prev) => {
      const existingIdx = prev.items.findIndex(
        (item) => getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id) === key
      );

      let nextItems;
      if (existingIdx >= 0) {
        nextItems = prev.items.map((item, idx) =>
          idx === existingIdx
            ? {
                ...item,
                quantity: Math.min(50, Number(item.quantity || 1) + Number(dish.quantity || 1)),
              }
            : item
        );
      } else {
        nextItems = [
          ...prev.items,
          {
            cartKey: key,
            menu_item_id: dish.menu_item_id,
            daily_menu_entry_id: dish.daily_menu_entry_id || null,
            slug: dish.slug || '',
            name_en: dish.name_en || '',
            name_fr: dish.name_fr || '',
            category: dish.category || '',
            meal_period: dish.meal_period || '',
            image_url: dish.image_url || '',
            dietary_tags: Array.isArray(dish.dietary_tags) ? dish.dietary_tags : [],
            allergens: Array.isArray(dish.allergens) ? dish.allergens : [],
            unit_price_xaf: Number(dish.unit_price_xaf || 0),
            quantity: Math.max(1, Math.min(50, Number(dish.quantity || 1))),
            notes: dish.notes || '',
          },
        ];
      }

      return {
        dailyMenuId: meta.dailyMenuId ?? prev.dailyMenuId,
        serviceDate: meta.serviceDate ?? prev.serviceDate,
        items: nextItems,
      };
    });
  }, []);

  const updateQuantity = useCallback((cartKey, delta) => {
    setCart((prev) => {
      const nextItems = prev.items
        .map((item) => {
          const k = getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id);
          if (k !== cartKey) return item;
          const nextQty = Number(item.quantity || 0) + Number(delta || 0);
          return nextQty <= 0 ? null : { ...item, quantity: Math.min(50, nextQty) };
        })
        .filter(Boolean);

      return { ...prev, items: nextItems };
    });
  }, []);

  const setQuantity = useCallback((cartKey, qty) => {
    const parsed = Number(qty || 0);
    setCart((prev) => {
      const nextItems = prev.items
        .map((item) => {
          const k = getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id);
          if (k !== cartKey) return item;
          return parsed <= 0 ? null : { ...item, quantity: Math.min(50, parsed) };
        })
        .filter(Boolean);

      return { ...prev, items: nextItems };
    });
  }, []);

  const updateItemNote = useCallback((cartKey, notes) => {
    const trimmed = String(notes || '').slice(0, 300);
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        const k = getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id);
        return k === cartKey ? { ...item, notes: trimmed } : item;
      }),
    }));
  }, []);

  const removeItem = useCallback((cartKey) => {
    setCart((prev) => ({
      ...prev,
      items: prev.items.filter(
        (item) => getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id) !== cartKey
      ),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCart({ dailyMenuId: null, serviceDate: null, items: [] });
  }, []);

  const getItemQuantity = useCallback(
    (menuItemId, dailyMenuEntryId = null) => {
      const targetKey = getMenuCartKey(menuItemId, dailyMenuEntryId);
      const found = cart.items.find(
        (item) => getMenuCartKey(item.menu_item_id, item.daily_menu_entry_id) === targetKey
      );
      return found ? Number(found.quantity || 0) : 0;
    },
    [cart.items]
  );

  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const itemCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [cart.items]
  );

  const subtotalXaf = useMemo(
    () =>
      cart.items.reduce(
        (sum, item) => sum + Number(item.unit_price_xaf || 0) * Number(item.quantity || 0),
        0
      ),
    [cart.items]
  );

  const value = useMemo(
    () => ({
      items: cart.items,
      dailyMenuId: cart.dailyMenuId,
      serviceDate: cart.serviceDate,
      itemCount,
      subtotalXaf,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      addItem,
      updateQuantity,
      setQuantity,
      updateItemNote,
      removeItem,
      clearCart,
      getItemQuantity,
    }),
    [
      cart.items,
      cart.dailyMenuId,
      cart.serviceDate,
      itemCount,
      subtotalXaf,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      addItem,
      updateQuantity,
      setQuantity,
      updateItemNote,
      removeItem,
      clearCart,
      getItemQuantity,
    ]
  );

  return <MenuCartContext.Provider value={value}>{children}</MenuCartContext.Provider>;
}
