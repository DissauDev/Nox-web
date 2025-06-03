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
  savedAddress: {
  id: 422,
  postalCode: "CA 95008",
  city: "Campbell",
  state: "California",
  fullAddress: "422 E Campbell Ave, Campbell, CA 95008",
  type: "pickup"
},
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
