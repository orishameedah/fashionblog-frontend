import { createSlice, configureStore } from '@reduxjs/toolkit'  //allows us to create slices of the redux toolkit

//creation of slice of authentication
const authSlice = createSlice({  //createSlice is  a function that accepts an intial state, an object full of reducer functions,
//and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
//The reducer argument is passed to createReducer().
    name: "auth",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            localStorage.removeItem("userId")
            state.isLoggedIn = false;
        },
    },
});

export const authActions = authSlice.actions  //refering to authSlice actions

export const store = configureStore({
    reducer: authSlice.reducer  //using reducer instead of reducers becos we have only one reducer
})   //a onfigured redux store