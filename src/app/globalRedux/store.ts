import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counters/counterSlice"
import currentUserReducer from "./features/users/loginUser";
import { followerSlice , followingSlice ,postSlice, followingDataSlice ,followersDataSlice , postDataSlice , loggedInUserSlice , userInfoSlice, visitingUserSlice, followerFollowingSlice} from "./features/users/postPageUser";

export const makeStore = () => {
    return configureStore({
        reducer : {
            counter : counterReducer,
            currentUser : currentUserReducer,
            userFollowers : followerSlice.reducer,
            userFollowing : followingSlice.reducer,
            userPost : postSlice.reducer,
            followingData : followingDataSlice.reducer,
            followersData : followersDataSlice.reducer,
            postData : postDataSlice.reducer,
            loggedUser : loggedInUserSlice.reducer,
            userInfo : userInfoSlice.reducer,
            visitingUser : visitingUserSlice.reducer,
            followerFollowing : followerFollowingSlice.reducer
        }
    })
}

// This is to infer types of AppStore
export type AppStore = ReturnType < typeof makeStore>
// THis is to infer types of RootState and AppDispatch types frfom the store itself
export type RootState = ReturnType< AppStore['getState']>
export type AppDispatch = AppStore['dispatch'];