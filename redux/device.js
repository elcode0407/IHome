import { createSlice } from "@reduxjs/toolkit";

// создаю новый Slice
const deviceSlice = createSlice({
  name: "roomsDevices",

  initialState: {
    // обьявляю базу с параметрами
    database: [],
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    //   функция что бы менять состояние
    changeState: (state, action) => {
      // получаю имя комнаты с девайсом что бы изменить нужное состояние и само состояниена которое нужно поменять
      const { roomName, deviceName, newState } = action.payload;
      state.database.rooms[roomName][deviceName].state = newState;
    },
    changeOptionState: (state, action) => {
      // получаю имя комнаты с девайсом что бы изменить нужное состояние и само состояниена которое нужно поменять
      const { roomName, deviceName, optionName, newState } = action.payload;
      state.database.rooms[roomName][deviceName].options[optionName] = newState;
    },
    setData: (state, action) => {
      state.database = action.payload.data;
    },
    authenticated: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = null;
    },
  },
});

export const authenticated = deviceSlice.actions.authenticated;
export const logout = deviceSlice.actions.logout;
export const changeState = deviceSlice.actions.changeState;
export const changeOptionState = deviceSlice.actions.changeOptionState;
export const setData = deviceSlice.actions.setData;
export default deviceSlice.reducer;
