import { createSlice } from "@reduxjs/toolkit";

// Create a new Slice for device state management
const deviceSlice = createSlice({
  name: "roomsDevices", // Name of the Slice

  initialState: {
    // Initial state with database, token, and authentication status
    database: [],
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    // Reducer function to change the state when a device's state changes
    changeState: (state, action) => {
      const { roomName, deviceName, newState } = action.payload;
      state.database.rooms[roomName].devices[deviceName].state = newState;
    },
    // Reducer function to change the state of an option for a device
    changeOptionState: (state, action) => {
      const { roomName, deviceName, optionName, newState } = action.payload;
      state.database.rooms[roomName].devices[deviceName].options[optionName] =
        newState;
    },
    // Reducer function to set data in the state
    setData: (state, action) => {
      state.database = action.payload.data;
    },
    // Reducer function to handle authentication
    authenticated: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // Reducer function to handle logout
    logout: (state, action) => {
      state.isAuthenticated = null;
    },
    // Reducer function to add a room to the state
    addRoom: (state, action) => {
      if (!state.database.rooms) {
        state.database.rooms = {};
      }
      state.database.rooms[action.payload.data.name] =
        action.payload.data.roomData;
    },
    // Reducer function to add a device to the state
    addDevice: (state, action) => {
      if (!state.database.rooms[action.payload.data.roomName]?.devices) {
        state.database.rooms[action.payload.data.roomName].devices = {};
      }
      state.database.rooms[action.payload.data.roomName].devices[
        action.payload.data.name
      ] = action.payload.data.data;
    },
    // Reducer function to remove a device from the state
    removeDevice: (state, action) => {
      const keysToRemove = [action.payload.name];

      state.database.rooms[action.payload.roomName].devices = Object.keys(
        state.database.rooms[action.payload.roomName].devices
      ).reduce((accumulator, key) => {
        if (!keysToRemove.includes(key)) {
          accumulator[key] =
            state.database.rooms[action.payload.roomName].devices[key];
        }
        return accumulator;
      }, {});
    },
    // Reducer function to remove a room from the state
    removeRoom: (state, action) => {
      const keysToRemove = [action.payload.name];

      state.database.rooms = Object.keys(state.database.rooms).reduce(
        (accumulator, key) => {
          if (!keysToRemove.includes(key)) {
            accumulator[key] = state.database.rooms[key];
          }
          return accumulator;
        },
        {}
      );
    },
  },
});

// Export the action creators
export const removeRoom = deviceSlice.actions.removeRoom;
export const removeDevice = deviceSlice.actions.removeDevice;
export const addDevice = deviceSlice.actions.addDevice;
export const addRoom = deviceSlice.actions.addRoom;
export const authenticated = deviceSlice.actions.authenticated;
export const logout = deviceSlice.actions.logout;
export const changeState = deviceSlice.actions.changeState;
export const changeOptionState = deviceSlice.actions.changeOptionState;
export const setData = deviceSlice.actions.setData;

// Export the reducer
export default deviceSlice.reducer;
