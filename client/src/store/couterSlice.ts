import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 20,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, actions) => {
      console.log(state);
      console.log(actions);
      state.value = state.value + actions.payload;
    },
    decrement: (state, actions) => {
      state.value = state.value - 1;
    },
  },
});

export const cartActions = counterSlice.actions;
export default counterSlice.reducer;
