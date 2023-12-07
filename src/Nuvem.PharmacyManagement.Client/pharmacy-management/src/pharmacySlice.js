import { createSlice } from '@reduxjs/toolkit';

const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState: {
    pharmacies: [],
    selectedPharmacy: null,
  },
  reducers: {
    setPharmacies: (state, action) => {
      state.pharmacies = action.payload;
    },
    selectPharmacy: (state, action) => {
      state.selectedPharmacy = action.payload;
    },

    updatePharmacyInList: (state, action) => {       
        const index = state.pharmacies.findIndex((pharmacy) => pharmacy.pharmacyId === action.payload.pharmacyId);
        if (index !== -1) {
          state.pharmacies[index] = action.payload;
        }
    }
  },
});

export const { setPharmacies, selectPharmacy, updatePharmacyInList } = pharmacySlice.actions;
export default pharmacySlice.reducer;
