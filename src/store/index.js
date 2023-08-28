import { configureStore } from "@reduxjs/toolkit";
import convertionReducer from "./Convertion/Convertion";

const store = configureStore({
    reducer: { convertion: convertionReducer },
});

export default store;