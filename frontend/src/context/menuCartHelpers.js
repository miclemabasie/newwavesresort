import { createContext, useContext } from 'react';

export const MENU_CART_STORAGE_KEY = 'nwr_menu_cart_v1';

export const MenuCartContext = createContext(null);

export function getMenuCartKey(menuItemId, dailyMenuEntryId = null) {
  return `${String(menuItemId || '')}:${dailyMenuEntryId ? String(dailyMenuEntryId) : 'catalog'}`;
}

export function loadStoredMenuCart() {
  if (typeof window === 'undefined') {
    return { dailyMenuId: null, serviceDate: null, items: [] };
  }
  try {
    const raw = window.sessionStorage.getItem(MENU_CART_STORAGE_KEY);
    if (!raw) return { dailyMenuId: null, serviceDate: null, items: [] };
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) {
      return { dailyMenuId: null, serviceDate: null, items: [] };
    }
    return {
      dailyMenuId: parsed.dailyMenuId || null,
      serviceDate: parsed.serviceDate || null,
      items: parsed.items.filter(
        (item) => item && item.menu_item_id && Number(item.quantity) > 0
      ),
    };
  } catch {
    return { dailyMenuId: null, serviceDate: null, items: [] };
  }
}

export function useMenuCart() {
  const ctx = useContext(MenuCartContext);
  if (!ctx) {
    throw new Error('useMenuCart must be used inside MenuCartProvider');
  }
  return ctx;
}
