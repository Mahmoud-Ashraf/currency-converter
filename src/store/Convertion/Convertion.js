import { createSlice } from '@reduxjs/toolkit';

const initialConvertionState = { from: 'EUR', to: 'USD', amount: 1, rate: 0 }

const convertionSlice = createSlice({
    name: 'convertion',
    initialState: initialConvertionState,
    reducers: {
        convert(state, action) {
            state.from = action.payload.from || state.from;
            state.to = action.payload.to || state.to;
            state.amount = action.payload.amount || state.amount;
            state.rate = action.payload.rate || state.rate;
        }
    }
})



export const ConvertionActions = convertionSlice.actions;

export default convertionSlice.reducer;