import { createSlice , PayloadAction } from "@reduxjs/toolkit";

interface loggedInUser {
    userId : number | null
}

const initialStateLoggedInUser : loggedInUser  = {
    userId : null
}

export const loggedInUserSlice = createSlice({
    name : "loggedInUser" ,
    initialState : initialStateLoggedInUser ,
    reducers : {
        loggedUser(state , action)
        {
            state.userId = action.payload
        }
    }
})
export interface followerType {
    followers : {
        id : number | null,
        followerId : number | null,
        followingId : number | null
    },
    numberOfFollowers : number
}

const initialState : followerType =  {
    followers : {
        id : null,
        followerId : null,
        followingId : null
    },
    numberOfFollowers : 0
}

export const followerSlice = createSlice({
    name : "userFollowers" ,
    initialState ,
    reducers : {
        followersUser(state , action)
        {
            state.numberOfFollowers = action.payload
        }
    }
});

// Following 

export interface followingType {
    following : {
        id : number | null,
        followerId : number | null,
        followingId : number | null
    },
    followingNumbers : number
}

const initialStateFollowing : followingType =  {
    following : {
        id : null,
        followerId : null,
        followingId : null
    },
    followingNumbers : 0
}

export const followingSlice = createSlice({
    name : "userFollowing" ,
    initialState : initialStateFollowing ,
    reducers : {
        followingUsers(state , action){
            state.followingNumbers = action.payload;
        }
    }
})

export interface postType {
    posts : {
        id : number | null,
        userId : number | null,
        restaurant : string,
        dish : string,
        city : string,
        caption : string | null ,
        image : string | null,
        location : string | null ,
        likeCount : string | null
    },
    postCount : number
}

const initialStatePost : postType =  {
    posts : {
        id : 0,
        userId : null,
        restaurant : '',
        dish : '',
        city : '',
        caption : null,
        image : null,
        location : null ,
        likeCount : null
    },
    postCount : 0
}

export const postSlice = createSlice({
    name : "userPost" ,
    initialState : initialStatePost ,
    reducers : {
        userPosts(state , action){
            state.postCount = action.payload;
        }
    }
})

interface followingDataType {
    following : {
        id : number,
        followerId : number,
        followingId : number,
        FollowingUser : {
            id : number ,
            email : string ,
            username : string,
            name : string,
            password : string
        }
    }[]
}

const initialStateFollowingData : followingDataType =  {
        following : []
}

export const followingDataSlice = createSlice({
    name : "followingData" ,
    initialState : initialStateFollowingData ,
    reducers : {
        userFollowingData(state , action) {
            state.following = action.payload
        }
    }
})

interface followersDataType {
    followers : {
        id : number,
        followerId : number,
        followingId : number,
        Usera : {
            id : number ,
            email : string ,
            username : string,
            name : string,
            password : string
        }
    }[]
}

const initialStateFollowersData : followersDataType =  {
    followers : []
}

export const followersDataSlice = createSlice({
    name : "followersData" ,
    initialState : initialStateFollowersData ,
    reducers : {
        userFollowersData(state , action) {
            state.followers = action.payload
        }
    }
})

interface Comment{
        id : number ,
        text : string,
        Usera : {
            id : number ,
            email : string ,
            username : string,
            name : string,
            password : string
        },
}

interface Likes {
    id : number ,
    userId : number ,
    postId : number
}

interface postDataType {
        id : number ,
        restaurant : string ,
        dish : string ,
        city : string ,
        caption : string | null ,
        image : string | null ,
        location : string | null ,
        Usera : {
            id : number ,
            email : string ,
            username : string,
            name : string,
            password : string
        },
        Comments : Comment[] ,
        Likes : Likes[]
}

interface PostState {
    postData : postDataType[]
}

const initialPostData : PostState = {
    postData : []
};

export const postDataSlice = createSlice({
    name : "postData" ,
    initialState : initialPostData ,
    reducers : {
        userPostData(state , action){
            state.postData = action.payload
        }  
    }
})

interface UserInfo {
    viewUserId : number
}

const initialStateUserInfo : UserInfo = {
    viewUserId : 0
}

export const userInfoSlice = createSlice({
    name : "userInfo" ,
    initialState : initialStateUserInfo,
    reducers : {
        pushUserId(state , action) {
            state.viewUserId = action.payload
        }
    }
})

interface VisitingUser {
    visitingUserId : number,
}

const initialStateVisitingUser : VisitingUser = {
    visitingUserId : 0
}

export const visitingUserSlice = createSlice({
    name : "visitingUser" ,
    initialState : initialStateVisitingUser,
    reducers : {
        setVisitingUser(state , action ) {
            state.visitingUserId = action.payload;
        }
    }
})

interface followerFollowing {
    followerId : number,
    followingId : number
}

const initialStateFollowerFollowing : followerFollowing = {
    followerId : 0 ,
    followingId : 0
}

export const followerFollowingSlice = createSlice({
    name : "followerFollowing" ,
    initialState : initialStateFollowerFollowing,
    reducers : {
        toggleFollowerFollowing(state , action ) {
            state.followerId = action.payload.followerId;
            state.followingId = action.payload.followingId;
        }
    }
})

export const { toggleFollowerFollowing } = followerFollowingSlice.actions;
export const { setVisitingUser } = visitingUserSlice.actions;
export const { userPostData } = postDataSlice.actions;
export const { followersUser } = followerSlice.actions;
export const { followingUsers } = followingSlice.actions;
export const { userPosts } = postSlice.actions;
export const { userFollowingData } = followingDataSlice.actions;
export const { userFollowersData } = followersDataSlice.actions;
export const { loggedUser } = loggedInUserSlice.actions;
export const { pushUserId } = userInfoSlice.actions;

export default {
    postData : postDataSlice.reducer,
    follower : followerSlice.reducer ,
    following : followingSlice.reducer ,
    posts : postSlice.reducer,
    followingData : followingDataSlice.reducer,
    followersData : followersDataSlice.reducer,
    loggedUser : loggedInUserSlice.reducer,
    userInfo : userInfoSlice.reducer,
    visitingUser : visitingUserSlice.reducer,
    followerFollowing : followerFollowingSlice.reducer,
}