import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocalCartItem {
  variantId: number;
  amount: number;
}

interface State {
  items: LocalCartItem[];
}

const initialState: State = {
  items: [],
};

export const localCartSlice = createSlice({
  initialState,
  name: 'localCartSlice',
  reducers: {
    addToLocalCart: (state, action: PayloadAction<{ variantId: number, amount: number }>) => {
      const isInCart = state.items.some(
        (item) => item.variantId === action.payload.variantId
      );

      if (!isInCart) {
        state.items.push({ ...action.payload });
      }
    },

    removeFromLocalCart: (state, action: PayloadAction<{ variantId: number }>) => {
      const isInCart = state.items.some(
        (item) => item.variantId === action.payload.variantId
      );

      if (isInCart) {
        state.items = state.items.filter(
          (item) => item.variantId !== action.payload.variantId
        );
      }
    },

    toggleLocalCart: (state, action: PayloadAction<{ variantId: number, amount: number }>) => {
      const isInCart = state.items.some(
        (item) => item.variantId === action.payload.variantId
      );

      if (isInCart) {
        state.items = state.items.filter(
          (item) => item.variantId !== action.payload.variantId
        );
      } else {
        state.items.push({ ...action.payload });
      }
    },

    updateAmountInLocalCart: (state, action: PayloadAction<{ variantId: number, amount: number }>) => {
      const item = state.items.find((item) => item.variantId === action.payload.variantId);
      if (item) {
        item.amount = action.payload.amount;
      }
    },
  },
});

export const {
  addToLocalCart,
  removeFromLocalCart,
  toggleLocalCart,
  updateAmountInLocalCart,
} = localCartSlice.actions;
