import { createSlice , PayloadAction } from "@reduxjs/toolkit";

export interface counterType {
    value : number;
}

const initialState : counterType =  {
    value : 0,
}

export interface commandType {
    loading : boolean;
}

const initialState2 : commandType = {
    loading : false
}

const counterSlice = createSlice({
    name : "counter" ,
    initialState ,
    reducers : {
        increment(state) {
            state.value ++;
        } ,
        decrement(state) {
            state.value++;
        },
        addAnyValue(state , action : PayloadAction<number>) {
            state.value = action.payload
        }
    }
});

const commandSlice = createSlice({
    name : "command" ,
    initialState : initialState2 ,
    reducers : {
        showData(state) {
            state.loading = true;
        }
    }
})

export const {increment , decrement , addAnyValue} = counterSlice.actions;
export default counterSlice.reducer;