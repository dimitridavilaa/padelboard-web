// src/store/cart.js
import { map } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

// 1. Usamos persistentAtom con JSON para que guarde OBJETOS reales, no texto roto
// Cambié el nombre a 'padelboard-cart-v2' para que se borre automáticamente el error anterior
export const cartItems = persistentAtom('padelboard-cart-v2', {}, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const isCartOpen = map({ isOpen: false });

// 2. Función para agregar productos
export function addToCart(product) {
    const currentItems = cartItems.get();
    const existingItem = currentItems[product.id];

    if (existingItem) {
        // Si ya existe, sumamos la cantidad con cuidado de que sean números
        const newQty = Number(existingItem.quantity) + Number(product.quantity);
        
        cartItems.set({
            ...currentItems,
            [product.id]: {
                ...existingItem,
                quantity: newQty
            }
        });
    } else {
        // Si es nuevo, lo agregamos
        cartItems.set({
            ...currentItems,
            [product.id]: product
        });
    }
    
    // Abrimos el carrito
    isCartOpen.set({ isOpen: true });
}

// 3. Función para quitar productos
export function removeFromCart(productId) {
    const currentItems = cartItems.get();
    const { [productId]: deleted, ...rest } = currentItems; // Truco para borrar una clave
    cartItems.set(rest);
}

// 4. Controlar si el carrito se ve o no
export function toggleCart(isOpen) {
    isCartOpen.set({ isOpen: !!isOpen });
}