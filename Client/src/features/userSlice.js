import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "Rezky",
        email: "rezky@gmail.com"
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {loginUser} = userSlice.actions

export default userSlice.reducer