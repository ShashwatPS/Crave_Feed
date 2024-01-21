import { createSlice } from "@reduxjs/toolkit";

export interface counterType {
    user :  {
        id : number | null,
        email : string ,
        username : string ,
        name : string ,
        followers : {
            id : number | null,
            followerId : number | null,
            followingId : number | null
        },
        numberOfFollowers : number
    }
}

const initialState : counterType =  {
    user :  {
        id : null,
        email : 'nil',
        username : '',
        name : "--" ,
        followers : {
            id : null,
            followerId : null,
            followingId : null
        },
        numberOfFollowers : 0,
    }
}

const userSlice = createSlice({
    name : "currentUser" ,
    initialState ,
    reducers : {
        currentUser(state , action) {
            state.user = action.payload
        } ,
        followersUser(state , action)
        {
            state.user.numberOfFollowers = action.payload.Follower.length;
        }
    }
});

export const { currentUser } = userSlice.actions;
export default userSlice.reducer;