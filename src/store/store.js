import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "@/features/cart/cartSlice";
const rootReducer = combineReducers({ cart: cartReducer });
const persistedReducer = persistReducer(
  { key: "nuvora-cart", storage, whitelist: ["cart"] },
  rootReducer,
);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});
export const persistor = persistStore(store);
