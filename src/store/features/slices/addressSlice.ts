import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AddressType = 'delivery' | 'pickup';

export interface Address {
  id: number;
  postalCode: string;
  city: string;
  state: string;
  fullAddress: string;
  type: AddressType;
}

interface AddressState {
  savedAddress: Address | null;
}

const initialState: AddressState = {
  savedAddress: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<Address>) => {
      state.savedAddress = action.payload;
    },
    clearAddress: (state) => {
      state.savedAddress = null;
    },
  },
});

export const { setAddress, clearAddress } = addressSlice.actions;
export default addressSlice.reducer;
