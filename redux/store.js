import { configureStore } from "@reduxjs/toolkit";
import deviceReducer from "./device";
export const store = configureStore({
  reducer: {
    //   обьявляю Reducer
    roomsDevices: deviceReducer,
  },
});
