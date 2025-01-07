import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0, // New property to store the total quantity of items
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            state.totalQuantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
            state.totalQuantity++; // Increment total quantity on new item
        }
    },
    removeItem: (state, action) => {
        const itemToRemove = state.items.find(item => item.name === action.payload);
        
        if (itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity; // Update total quantity when an item is removed
            state.items = state.items.filter(item => item.name !== action.payload);
        }
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            state.totalQuantity += quantity - itemToUpdate.quantity;
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
